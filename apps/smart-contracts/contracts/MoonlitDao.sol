//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract MoonlitDao is ERC1155, AccessControlEnumerable, ERC1155Supply {
  bytes32 public constant AUTHOR_ROLE = keccak256("AUTHOR_ROLE");

  string public TITLE;
  string public SUBTITLE;
  string public GENRE;
  address public AUTHOR_ADDRESS;
  string public AUTHOR_NAME;
  string public IPFSLINK;
  address constant public MOONLIT_FOUNDATION_ADDRESS = 0xc5F490B1629f6D6580F33bF53CEe23eF52cEF89C;
  
  struct AuthorShare {
    uint256 share;
    uint256 shareInMatic;
    bool hasWithdrawnShare;
  }

  struct contribution {
    address shareRecipient;
    uint256 share;
    uint256 shareInMatic;
    bool hasWithdrawnShare;
  }

  uint256 public MAX_PER_WALLET = 5;
  uint256 public MINT_PRICE;
  uint256 public fundedAmount = 0;

  AuthorShare public author = AuthorShare(0, 0, false);
  mapping(address => uint256) public investments;
  mapping(uint256 => contribution) public contributors;
  uint8 public contributorIndex = 0;
  uint256 public currentEdition = 1;
  uint256 public currentEditionMax;
  uint256 public currentEditionMintPrice;
  // 15% always go to the DAO 
  uint256 public totalSharePercentage = 15;
  bool public investingFinished = false;
  bool public shareSentToMoonlit = false;
  bool public refundEnabled = false;

  modifier whenInvestingFinished {
    require(investingFinished, "Investing still running");
    _;
  }

  modifier whenRefundEnabled {
    require(refundEnabled, "Refund not enabled");
    _;
  }

  constructor(
      string memory _title,
      string memory _subtitle,
      string memory _genre,
      address _author_address,
      string memory _author_name,
      string memory _ipfsLink,
      uint256 _initialMintPrice,
      uint256 _firstEditionMax
    ) ERC1155("") {
        // is it ok to give MOONLIT_FOUNDATION_ADDRESS DEFAULT_ADMIN_ROLE and they have the ability to freeze the contract?
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(AUTHOR_ROLE, msg.sender);
        _setURI(_ipfsLink);
        TITLE = _title;
        SUBTITLE = _subtitle;
        GENRE = _genre;
        AUTHOR_ADDRESS = _author_address;
        AUTHOR_NAME = _author_name;
        MINT_PRICE = _initialMintPrice;
        currentEditionMax = _firstEditionMax;
  }

  function deposit(uint256 _amount) public payable {
    require((investments[msg.sender] + _amount) <= MAX_PER_WALLET, "Exceeds max per wallet.");
    require(fundedAmount + _amount <= currentEditionMax, "Investment exceeds cap.");
    require(MINT_PRICE * _amount <= msg.value, "Value sent is not sufficient.");
    investments[msg.sender] = investments[msg.sender] + _amount;
    fundedAmount = fundedAmount + _amount;

    if (fundedAmount == currentEditionMax) {
      investingFinished = true;
      calculateShares();
      // trigger the function that creates a erc1155
    }
  }

  function claimRefund() external whenRefundEnabled {
    require(investments[msg.sender] > 0, "Nothing to refund");
    uint256 refundAmountMatic = MINT_PRICE * investments[msg.sender];
    withdraw(msg.sender, refundAmountMatic);
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

  function claimGenesisEditionNFT(address account)
    public
    whenInvestingFinished
  {
    require(investments[account] > 0, "Cannot claim");
    _mint(account, 1, investments[account], "");
  }

  function mint(address account, uint256 _amount)
    external
    payable
  {
    require(currentEdition != 1, "Cannot mint during Genesis NFT claiming");
   
    require(address(msg.sender).balance + _amount <= MAX_PER_WALLET, "Exceeds max per wallet.");
    require(totalSupply(currentEdition) + _amount <= currentEditionMax, "Amount exceeds cap.");
    require(msg.value >= currentEditionMintPrice, "Value sent is not sufficient.");
    _mint(account, currentEdition, _amount, "");
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
    withdraw(MOONLIT_FOUNDATION_ADDRESS, moonlitFoundationShareInMatic);

    // create the NFT contract or unlock
  }

  function withdraw(address _to, uint256 _amount) internal {
    require(_to != address(0), "Cannot withdraw to the 0 address");
    payable(_to).transfer(_amount);
  }

  // ------------------
  // Functions for the author
  // ------------------

  function addContributor(address _contributor, uint256 _share) external onlyRole(AUTHOR_ROLE) {
    // in theory user can put the same contributor 3 times - we don't care
    require(_contributor != address(0), "Contribut cannot be 0 address");
    require(contributorIndex < 3, "Contributors already set");
    require(totalSharePercentage + _share < 101, "Contributor's share too high");
    contributors[contributorIndex].shareRecipient = _contributor;
    contributors[contributorIndex].share = _share;
    contributors[contributorIndex].hasWithdrawnShare = false;
    totalSharePercentage = totalSharePercentage + _share;
    contributorIndex = contributorIndex + 1;
  }

  function setURI(string memory newuri) public onlyRole(AUTHOR_ROLE) {
    _setURI(newuri);
  }

  function enableRefund() external onlyRole(AUTHOR_ROLE) {
    require(fundedAmount < currentEditionMax, "Refund impossible, all spots for funding taken.");
    refundEnabled = true;
  }

  function withdrawShareAuthor(address _to) external whenInvestingFinished onlyRole(AUTHOR_ROLE) {
    require(msg.sender == AUTHOR_ADDRESS, 'Not author');
    require(!author.hasWithdrawnShare, 'Share already withdrawn');
    withdraw(_to, author.shareInMatic);
    author.hasWithdrawnShare = true;
  }

  function enableNextEdition(uint256 _maxNftAmountOfNewEdition, uint256 _newEditionMintPrice) public onlyRole(AUTHOR_ROLE) {
    // what if some nfts are sent to zero address? Is there a case that prevents this check from being true?
    require(totalSupply(currentEdition) == currentEditionMax, "Current edition needs to sellout first");
    require(_maxNftAmountOfNewEdition < 10000, "Max Amount too big");
    currentEdition = currentEdition + 1;
    currentEditionMax = _maxNftAmountOfNewEdition;
    currentEditionMintPrice = _newEditionMintPrice;
  }

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
// BEWARE - that a contributor can take her time until she withdraws the fund - meanwhile users can
  // mint nfts and the value locked keeps rising...
// Contributor struct should have "jobs description" inside contributr struct
// remix deployment constructor arguments
// "Test" "Subtitle" "Fiction" "0xc5F490B1629f6D6580F33bF53CEe23eF52cEF89C" "0xAuthor" "ipfsLink" 50000000000000000 3