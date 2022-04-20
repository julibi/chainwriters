//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";


contract ProjectDao is ERC1155, AccessControlEnumerable, ERC1155Supply {
  bytes32 public constant AUTHOR_ROLE = keccak256("AUTHOR_ROLE"); 
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
    bool hasWithdrawnShare;
    uint256 genesisEditionReserved;
    bool hasClaimedGenesis;
  }

  struct Contribution {
    address shareRecipient;
    string role;
    uint256 share;
    uint256 shareInMatic;
    bool hasWithdrawnShare;
  }

  Project public project = Project("", "", "", address(0), "", "", "");
  AuthorShare public author = AuthorShare(0, 0, false, 1, false);
  mapping(uint256 => Contribution) public contributors;
  uint8 public contributorIndex = 0;

  uint256 public MAX_PER_WALLET = 5;
  uint256 public INITIAL_MINT_PRICE;

  uint256 public currentEdition = 1;
  uint256 public currentEditionMax;
  uint256 public currentEditionMintPrice;
  // 15% always go to the DAO 
  uint256 public totalSharePercentage = 15;
  bool public investingFinished = false;
  bool public shareSentToMoonlit = false;
  bool public refundEnabled = false;

  uint256 public AUCTION_DURATION = 1 days;
  uint public discountRate;
  uint public startAt;
  uint public expiresAt;
  bool public auctionStarted;
  bool public auctionPhaseFinished;
  // bool public paused = true;
  event DaoCreated(
    address indexed caller,
    address indexed dao,
    string title,
    string textIpfsHash,
    uint256 initialMintPrice
  );
  event ImgSet(string imgHash);
  event BlurbSet(string blurbHash);
  event GenreSet(string newGenre);
  event SubtitleSet(string newSubtitle);
  event TextSet(string textHash);
  event ContributorAdded(address contributor, uint256 share, string role);

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
      project.textIpfsHash = _textIpfsHash;
      project.title = _title;
      project.author_address = _author_address;
      INITIAL_MINT_PRICE = _initialMintPrice;
      currentEditionMax = _firstEditionMax;
      factory = _factory;

      emit DaoCreated(
        _author_address,
        address(this),
        _title,
        _textIpfsHash,
        _initialMintPrice
      );
  }

  modifier whenAuctionsPhaseFinished() {
    require(auctionPhaseFinished);
      _;
  }

  function withdrawShareContributor(address _to) external whenAuctionsPhaseFinished {
    bool canWithdraw = false;
    for(uint256 i = 0; i < contributorIndex; i++) {
      if (msg.sender == contributors[i].shareRecipient) {
        if (!contributors[i].hasWithdrawnShare) {
          canWithdraw = true;
          withdraw(_to, contributors[i].shareInMatic);
          contributors[i].hasWithdrawnShare = true;
        }
      }
    }
    require(canWithdraw, "Cannot withdraw");
  }

  function buy() external payable {
    require(block.timestamp < expiresAt, "This auction has ended");
    require(!auctionPhaseFinished, "Auctions finished");
    uint price = getPrice();
    require(msg.value >= price, "Value sent not sufficient.");

    _mint(msg.sender, 1, 1, "");
    uint refund = msg.value - price;
    if (refund > 0) {
        payable(msg.sender).transfer(refund);
    }
    if(totalSupply(1) < currentEditionMax) {
      triggerNextAuction();
    } else {
      calculateShares();
      auctionPhaseFinished = true;
    }
  }

  function mint(uint256 _amount)
    external
    payable
  {
    require(currentEdition != 1, "Cannot mint during Genesis Edition Auction.");
    require((balanceOf(msg.sender, currentEdition) + _amount) <= MAX_PER_WALLET, "Exceeds max per wallet.");
    require((totalSupply(currentEdition) + _amount) <= currentEditionMax, "Amount exceeds cap.");
    require(msg.value >= currentEditionMintPrice * _amount, "Value sent not sufficient.");
    _mint(msg.sender, currentEdition, _amount, "");
  }

  // ------------------
  // View functions
  // -----------------

  function getPrice() public view returns (uint) {
    uint timeElapsed = block.timestamp - startAt;
    uint discount = discountRate * timeElapsed;
    return startingPrice - discount;
  }

  // ------------------
  // Private functions
  // ------------------

  function triggerNextAuction() private {
    startAt = block.timestamp;
    expiresAt = block.timestamp + AUCTION_DURATION;
  }

  function calculateShares() private {
    uint256 shareAuthor = 85;
    uint256 balanceTotal = address(this).balance;
    uint256 foundationShareInMatic = balanceTotal * 15 / 100;
    for(uint256 i = 0; i < contributorIndex; i++) {
      shareAuthor = shareAuthor - contributors[i].share;
      contributors[i].shareInMatic = balanceTotal * contributors[i].share / 100;
    }
    author.share = shareAuthor;
    author.shareInMatic = balanceTotal * shareAuthor / 100;
    withdraw(factory, foundationShareInMatic);
  }

  function withdraw(address _to, uint256 _amount) private {
    require(_to != address(0), "Cannot withdraw to the 0 address");
    payable(_to).transfer(_amount);
  }

  // ------------------
  // Functions for the author
  // ------------------
 
  // add role of contributor
  function addContributor(address _contributor, uint256 _share, string _role) external onlyRole(AUTHOR_ROLE)  {
    // in theory user can put the same contributor 3 times - we don't care
    require(_contributor != address(0), "Contribut cannot be 0 address");
    require(contributorIndex < 3, "Contributors already set");
    require(totalSharePercentage + _share < 101, "Contributor's share too high");
    contributors[contributorIndex].shareRecipient = _contributor;
    contributors[contributorIndex].share = _share;
    contributors[contributorIndex].role = _share;
    contributors[contributorIndex].hasWithdrawnShare = false;
    totalSharePercentage = totalSharePercentage + _share;
    contributorIndex = contributorIndex + 1;
    emit ContributorAdded(_contributor, _share, _role);
  }

  function setTextIpfsHash(string memory _ipfsHash) external onlyRole(AUTHOR_ROLE)  {
    project.textIpfsHash = _ipfsHash; 
    emit TextSet(_ipfsHash);
  }

  function setImgIpfsHash(string calldata _imgHash) external onlyRole(AUTHOR_ROLE) {
    project.imgIpfsHash = _imgHash;
    emit ImgSet(_imgHash);
  }

  function setBlurbIpfsHash(string calldata _blurbHash) external onlyRole(AUTHOR_ROLE) {
    project.blurbIpfsHash = _blurbHash;
    emit BlurbSet(_blurbHash);
  }

  function setGenre(string memory _genre) external onlyRole(AUTHOR_ROLE) {
    project.genre = _genre;
    emit GenreSet(_genre);
  }

  function setSubtitle(string memory _subtitle) external onlyRole(AUTHOR_ROLE) {
    project.subtitle = _subtitle;
    emit SubtitleSet(_subtitle);
  }

  function setMaxGenesisClaimableAuthor(uint256 _amount) external onlyRole(AUTHOR_ROLE)  {
    require(_amount < currentEditionMax, "Too many");
    
    author.genesisEditionReserved = _amount;
  }

  function withdrawShareAuthor(address _to) external whenAuctionsPhaseFinished onlyRole(AUTHOR_ROLE) {
    require(!author.hasWithdrawnShare, 'Share already withdrawn');
    withdraw(_to, author.shareInMatic);
    author.hasWithdrawnShare = true;
  }

  function triggerFirstAuction(uint256 _discountRate, uint256 _expiresAt) external onlyRole(AUTHOR_ROLE) {
    discountRate = _discountRate;
    startAt = block.timestamp;
    expiresAt = _expiresAt + AUCTION_DURATION;
    auctionStarted = true;
  }

  function enableNextEdition(uint256 _maxNftAmountOfNewEdition, uint256 _newEditionMintPrice) external onlyRole(AUTHOR_ROLE) {
    if (currentEdition == 1) {
      require(investingFinished, "Investing must finish first");
    } else {
    // what if some nfts are sent to zero address? Is there a case that prevents this check from being true?
      require(totalSupply(currentEdition) == currentEditionMax, "Current edition needs to sellout first");
    }
    require(_maxNftAmountOfNewEdition < 10000, "Max Amount too big");
    currentEdition = currentEdition + 1;
    currentEditionMax = _maxNftAmountOfNewEdition;
    currentEditionMintPrice = _newEditionMintPrice;
  }

  // !! REMOVE !!
  // only for development
  function withdrawAll() external onlyRole(AUTHOR_ROLE) {
    uint256 balance = address(this).balance;
    payable(msg.sender).transfer(balance);
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