//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

// should it be ownable?
// Doo : what about the metadata
// _setURI(_ipfsHash);

contract MoonlitDao is ERC1155, AccessControlEnumerable, ERC1155Supply {
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
    uint256 share;
    uint256 shareInMatic;
    bool hasWithdrawnShare;
  }

  Project public project = Project("", "", "", address(0), "", "", "");
  AuthorShare public author = AuthorShare(0, 0, false, 1, false);
  mapping(address => uint256) public investments;
  mapping(uint256 => Contribution) public contributors;
  uint8 public contributorIndex = 0;

  uint256 public MAX_PER_WALLET = 5;
  uint256 public INITIAL_MINT_PRICE;
  uint256 public fundedAmount = 0;

  uint256 public currentEdition = 1;
  uint256 public currentEditionMax;
  uint256 public currentEditionMintPrice;
  // 15% always go to the DAO 
  uint256 public totalSharePercentage = 15;
  bool public investingFinished = false;
  bool public shareSentToMoonlit = false;
  bool public refundEnabled = false;
  // bool public paused = true;
  event Deposited(uint256 fundedAmount);
  event FundingEnded(bool finished);
  event ImgSet(string imgHash);
  event BlurbSet(string blurbHash);
  event GenreSet(string newGenre);
  event SubtitleSet(string newSubtitle);
  event TextSet(string textHash);
  event ContributorAdded(address contributor, uint256 share, string role);

  modifier whenInvestingFinished {
    require(investingFinished, "Investing still running");
    _;
  }

  modifier whenRefundEnabled {
    require(refundEnabled, "Refund not enabled");
    _;
  }

    modifier isBeforeInvesting {
    require(fundedAmount == 0, "Investing has already started");
    _;
  }

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
  }

  function deposit(uint256 _amount) external payable {
    require(currentEdition == 1, "Deposit impossible");
    require((investments[msg.sender] + _amount) <= MAX_PER_WALLET, "Exceeds max per wallet");
    require((fundedAmount + _amount) <= (currentEditionMax - author.genesisEditionReserved), "Investor list full");
    require(INITIAL_MINT_PRICE * _amount <= msg.value, "Value sent not sufficient");
    investments[msg.sender] = investments[msg.sender] + _amount;
    fundedAmount = fundedAmount + _amount;
    emit Deposited(fundedAmount);
    if (fundedAmount == (currentEditionMax - author.genesisEditionReserved)) {
      investingFinished = true;
      emit FundingEnded(true);
      calculateShares();
    }
  }

  function claimRefund() external whenRefundEnabled {
    require(investments[msg.sender] > 0, "Nothing to refund");
    uint256 refundAmountMatic = INITIAL_MINT_PRICE * investments[msg.sender];
    withdraw(msg.sender, refundAmountMatic);
    investments[msg.sender] = 0;
  }

  function withdrawShareContributor(address _to) external whenInvestingFinished {
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

  function claimGenesisEditionNFT()
    external
    whenInvestingFinished
  {
    if (msg.sender == project.author_address) {
      require(!author.hasClaimedGenesis, "Already claimed");
      _mint(msg.sender, 1, author.genesisEditionReserved, "");
      author.hasClaimedGenesis = true;
    } else {
      require(investments[msg.sender] > 0, "Cannot claim");
      _mint(msg.sender, 1, investments[msg.sender], "");
      investments[msg.sender] = 0;
    }
  }

  function mint(address _account, uint256 _amount)
    external
    payable
  {
    require(currentEdition != 1, "Cannot mint during Genesis NFT claiming");
    require((balanceOf(_account, currentEdition) + _amount) <= MAX_PER_WALLET, "Exceeds max per wallet.");
    require((totalSupply(currentEdition) + _amount) <= currentEditionMax, "Amount exceeds cap.");
    require(msg.value >= currentEditionMintPrice * _amount, "Value sent not sufficient.");
    _mint(_account, currentEdition, _amount, "");
  }

  // ------------------
  // Internal functions
  // ------------------

  function calculateShares() internal {
    uint256 shareAuthor = 85;
    uint256 balanceTotal = address(this).balance;
    uint256 moonlitFoundationShareInMatic = balanceTotal * 15 / 100;
    for(uint256 i = 0; i < contributorIndex; i++) {
      shareAuthor = shareAuthor - contributors[i].share;
      contributors[i].shareInMatic = balanceTotal * contributors[i].share / 100;
    }
    author.share = shareAuthor;
    author.shareInMatic = balanceTotal * shareAuthor / 100;
    withdraw(factory, moonlitFoundationShareInMatic);

    // create the NFT contract or unlock
  }

  function withdraw(address _to, uint256 _amount) internal {
    require(_to != address(0), "Cannot withdraw to the 0 address");
    payable(_to).transfer(_amount);
  }

  // ------------------
  // Functions for the author
  // ------------------
 
  // add role of contributor
  function addContributor(address _contributor, uint256 _share) external onlyRole(AUTHOR_ROLE) isBeforeInvesting {
    // in theory user can put the same contributor 3 times - we don't care
    require(_contributor != address(0), "Contribut cannot be 0 address");
    require(contributorIndex < 3, "Contributors already set");
    require(totalSharePercentage + _share < 101, "Contributor's share too high");
    contributors[contributorIndex].shareRecipient = _contributor;
    contributors[contributorIndex].share = _share;
    contributors[contributorIndex].hasWithdrawnShare = false;
    totalSharePercentage = totalSharePercentage + _share;
    contributorIndex = contributorIndex + 1;
    emit ContributorAdded(_contributor, _share, "");
  }

  function setTextIpfsHash(string memory _ipfsHash) public onlyRole(AUTHOR_ROLE) isBeforeInvesting {
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

  function setMaxGenesisClaimableAuthor(uint256 _amount) public onlyRole(AUTHOR_ROLE) isBeforeInvesting {
    require(_amount < currentEditionMax, "Too many");
    
    author.genesisEditionReserved = _amount;
  }

  function withdrawShareAuthor(address _to) external whenInvestingFinished onlyRole(AUTHOR_ROLE) {
    require(!author.hasWithdrawnShare, 'Share already withdrawn');
    withdraw(_to, author.shareInMatic);
    author.hasWithdrawnShare = true;
  }

  function enableNextEdition(uint256 _maxNftAmountOfNewEdition, uint256 _newEditionMintPrice) public onlyRole(AUTHOR_ROLE) {
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

  function enableRefund() external onlyRole(AUTHOR_ROLE) {
    require(currentEdition == 1, "Refund impossible");
    require(fundedAmount < (currentEditionMax - author.genesisEditionReserved), "Refund impossible, all spots for funding taken");
    refundEnabled = true;
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

// project name is not visible on dao contract ...

// the issue with genesisEditionReserved for author - he could take all and market them himself - we don't want that
// make it a fixed amount in percentage? 

// - royalties
// - what should happen after investing successfully finishes? We could open the astronaut's club for the project, where they vote
//   what to do with the money (this would be a seperate contract that where the funds in the DAO are being governed)
    // - vote on what the NFT should be used for?
    // - vote on how to spend the money
    // - vote on when to close down the nft selling
// - when refunding the ipfs link should be deleted ? no but when posting the ipfs text always put down the author address - so even if some other "author"
//   picks up the text again, he cannot sell it as his/her own 
// - BEWARE - when doing a final distribution, consider if there is an amount for contributors that has not been withdrawn yet
// - should Contributor struct should have "jobs description" ?
// remix deployment constructor arguments
// "Test" "Subtitle" "Fiction" "0xc5F490B1629f6D6580F33bF53CEe23eF52cEF89C" "0xAuthor" "ipfsLink" 50000000000000000 3