//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract ProjectDao is ERC1155, AccessControlEnumerable, ERC1155Supply, Pausable {
  bytes32 public constant AUTHOR_ROLE = keccak256("AUTHOR_ROLE");
  bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
  address public factory;
  
  struct Project {
    string title;
    string subtitle;
    string genre;
    address author_address;
    string textIpfsHash;
    string imgIpfsHash;
    string blurbIpfsHash;
  }

  struct AuthorShare {
    uint256 share;
    uint256 shareInMatic;
    uint256 claimedAmount;
    bool hasClaimedGenesis;
  }

  struct Contribution {
    address shareRecipient;
    string role;
    uint256 share;
    uint256 shareInMatic;
  }

  Project public project = Project("", "", "", address(0), "", "", "");
  AuthorShare public author = AuthorShare(0, 0, 0, false);
  mapping(uint256 => Contribution) public contributors;
  uint8 public contributorIndex = 0;

  uint256 public MAX_PER_WALLET = 5;
  uint256 public INITIAL_MINT_PRICE;

  uint256 public currentEdition = 1;
  uint256 public currentEditionMax;
  uint256 public currentEditionMintPrice;
  // 15% always go to the DAO 
  uint256 public totalSharePercentage = 15;

  // uint256 public AUCTION_DURATION = 1 days;
  uint256 public AUCTION_DURATION = 1 days;
  uint public discountRate;
  uint public startAt;
  uint public expiresAt;
  bool public auctionStarted = false;
  bool public auctionPhaseFinished = false;
  // bool public paused = true;
  event Configured(
    string imgHash,
    string blurbHash,
    string newGenre,
    string newSubtitle
  );
  event TextSet(string textHash);
  event ContributorAdded(address contributor, uint256 share, string role);
  event AuctionsStarted(bool started);
  event AuctionsEnded(bool ended);
  event Paused(bool paused);

  constructor(
      string memory _title,
      address _author_address,
      string memory _textIpfsHash,
      uint256 _initialMintPrice,
      uint256 _firstEditionMax,
      address _factory
    ) ERC1155("") {
      // is it ok to give MOONLIT_FOUNDATION_ADDRESS DEFAULT_ADMIN_ROLE and they have the ability to freeze the contract?
      _setupRole(DEFAULT_ADMIN_ROLE, _author_address);
      _setupRole(AUTHOR_ROLE, _author_address);
      _setupRole(PAUSER_ROLE, _factory);
      project.textIpfsHash = _textIpfsHash;
      project.title = _title;
      project.author_address = _author_address;
      INITIAL_MINT_PRICE = _initialMintPrice;
      currentEditionMax = _firstEditionMax;
      factory = _factory;
  }

  function showTimestamp() public view returns (uint) {
    return block.timestamp;
  }

  function retriggerAuction() external {
    require(expiresAt > block.timestamp, "Triggering unnecessary. Auction running.");
    startAt = block.timestamp;
    expiresAt = block.timestamp + AUCTION_DURATION;
  }

  function buy() external payable whenNotPaused {
    require(auctionStarted, "Auctions have not started");
    require(!auctionPhaseFinished, "Auctions finished");
    require(expiresAt > block.timestamp, "Auction ended. Trigger a new one.");
    // this require needed?
    require(totalSupply(1) + 1 <= currentEditionMax, "Sold out");
    uint price = getPrice();
    bool shouldFinalize = (totalSupply(1) + 1) == currentEditionMax;
    require(msg.value >= price, "Value sent not sufficient.");

    _mint(msg.sender, 1, 1, "");
    // uint refund = msg.value - price;
    // if (refund > 0) {
    //     payable(msg.sender).transfer(refund);
    // }

    if(shouldFinalize) {
      auctionPhaseFinished = true;
      distributeShares();
      emit AuctionsEnded(true);
    } else {
      triggerNextAuction();
    }
  }

  function mint(uint256 _amount)
    external
    payable
    whenNotPaused
  {
    require(currentEdition != 1, "Public minting only possible from edition 2");
    require((balanceOf(msg.sender, currentEdition) + _amount) <= MAX_PER_WALLET, "Exceeds max per wallet.");
    require((totalSupply(currentEdition) + _amount) <= currentEditionMax, "Amount exceeds cap.");
    require(msg.value >= currentEditionMintPrice * _amount, "Value sent not sufficient.");
    _mint(msg.sender, currentEdition, _amount, "");
  }

  // ------------------
  // View functions
  // -----------------

  function getPrice() public view returns (uint) {
    if (auctionStarted && !auctionPhaseFinished) {
      uint timeElapsed = block.timestamp - startAt;
      uint discount = discountRate * timeElapsed;
      return INITIAL_MINT_PRICE - discount;
    }
    return 0;
  }

  // ------------------
  // Private functions
  // ------------------

  function triggerNextAuction() private {
    startAt = block.timestamp;
    expiresAt = block.timestamp + AUCTION_DURATION;
  }

  function distributeShares() private {
    uint256 shareAuthor = 85;
    uint256 balanceTotal = address(this).balance;
    uint256 foundationShareInMatic = balanceTotal * 15 / 100;
    for(uint256 i = 0; i < contributorIndex; i++) {
      shareAuthor = shareAuthor - contributors[i].share;
      contributors[i].shareInMatic = balanceTotal * contributors[i].share / 100;
      if (i == (contributorIndex - 1)) {
        author.share = shareAuthor;
        author.shareInMatic = balanceTotal * shareAuthor / 100;
      }
      withdraw(contributors[i].shareRecipient, contributors[i].shareInMatic);
    }
    withdraw(factory, foundationShareInMatic);
    withdraw(project.author_address, author.shareInMatic);
  }

  // test from private to internal
  function withdraw(address  _to, uint256 _amount) internal {
    require(_to != address(0), "Cannot withdraw to the 0 address");
    payable(_to).transfer(_amount);
  }

  function destroy() external onlyRole(AUTHOR_ROLE) {
    selfdestruct(payable(project.author_address));
  }

  // ------------------
  // Functions for the author
  // ------------------
 
  // add role of contributor
  function addContributors(
    address[] calldata _contributors,
    uint256[] calldata _shares,
    string[] calldata _roles
  )
    external
    onlyRole(AUTHOR_ROLE)
    whenNotPaused
  {
    // in theory user can put the same contributor 3 times - we don't care
    require(!auctionStarted, "Cannot change after auction started");
    require((contributorIndex + _contributors.length) <= 3, "Max 3 contributors");
    require(
      (_contributors.length == _shares.length) &&
      (_contributors.length == _roles.length),
    "Same length required");
    uint256 contribTotalShares = 0;
    for (uint8 i = 0; i < _contributors.length; i++) {
      contribTotalShares += _shares[i];
    }
    require(contribTotalShares <= 85, "Contributor shares too high");

    totalSharePercentage += contribTotalShares;
    for (uint8 i = 0; i < _contributors.length; i++) {
      require(_contributors[i] != address(0), "Contributor cannot be 0 address");
      contributors[contributorIndex].shareRecipient = _contributors[i];
      contributors[contributorIndex].share = _shares[i];
      contributors[contributorIndex].role = _roles[i];
      contributorIndex ++;
      emit ContributorAdded(_contributors[i], _shares[i], _roles[i]);
    }
  }

  function configureProjectDetails(
    string calldata _imgHash,
    string calldata _blurbHash,
    string memory _genre,
    string memory _subtitle
  ) external onlyRole(AUTHOR_ROLE) whenNotPaused {
    require(!auctionStarted, "Configuration only possible before auctions start");
    project.imgIpfsHash = _imgHash;
    project.blurbIpfsHash = _blurbHash;
    project.genre = _genre;
    project.subtitle = _subtitle;

    emit Configured(
      _imgHash,
      _blurbHash,
      _genre,
      _subtitle
    );
  }

  function setTextIpfsHash(string memory _ipfsHash) external onlyRole(AUTHOR_ROLE) whenNotPaused {
    require(!auctionStarted, "Configuration only possible before auctions start");
    project.textIpfsHash = _ipfsHash; 
    emit TextSet(_ipfsHash);
  }

  function authorMint(uint256 _amount) external onlyRole(AUTHOR_ROLE) whenNotPaused {
    require(!auctionStarted, "Auctions already started");
    require(author.hasClaimedGenesis == false, "Already claimed");
    require(_amount > 0 && _amount < currentEditionMax, "Invalid amount");
    _mint(msg.sender, 1, _amount, "");
    author.claimedAmount = _amount;
    author.hasClaimedGenesis = true;
  }

  function triggerFirstAuction(uint256 _discountRate) external onlyRole(AUTHOR_ROLE) whenNotPaused {
    require(author.hasClaimedGenesis, "Mint tokens before triggering auctions");
    discountRate = _discountRate;
    startAt = block.timestamp;
    expiresAt = block.timestamp + AUCTION_DURATION;
    auctionStarted = true;
    emit AuctionsStarted(true);
  }

  function enableNextEdition(uint256 _maxNftAmountOfNewEdition, uint256 _newEditionMintPrice) external onlyRole(AUTHOR_ROLE) whenNotPaused {
    if (currentEdition == 1) {
      require(auctionPhaseFinished, "Auctions must finish first");
    } else {
    // what if some nfts are sent to zero address? Is there a case that prevents this check from being true?
      require(totalSupply(currentEdition) == currentEditionMax, "Current edition needs to sellout first");
    }
    require(_maxNftAmountOfNewEdition < 10000, "Max Amount too big");
    currentEdition = currentEdition + 1;
    currentEditionMax = _maxNftAmountOfNewEdition;
    currentEditionMintPrice = _newEditionMintPrice;
  }

  // ------------------
  // Can only be called by Foundation
  // ------------------

  function pause() external onlyRole(PAUSER_ROLE) {
    _pause();
  }

  function unpause() external onlyRole(PAUSER_ROLE) {
    _unpause();
  }

  // ------------------
  // Explicit overrides
  // ------------------

  // The following functions are overrides required by Solidity.

  function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
      internal
      override(ERC1155, ERC1155Supply)
  {
      super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
  }

  function supportsInterface(bytes4 interfaceId)
      public
      view
      override(ERC1155, AccessControlEnumerable)
      returns (bool)
  {
      return super.supportsInterface(interfaceId);
  }
}
