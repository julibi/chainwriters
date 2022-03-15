//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract MoonlitDao is AccessControlEnumerable {
  bytes32 public constant AUTHOR_ROLE = keccak256("AUTHOR_ROLE");

  mapping(address => uint256) public investments;
  string public TITLE;
  string public SUBTITLE;
  string public GENRE;
  address public AUTHOR_ADDRESS;
  string public AUTHOR_NAME;
  string public IPFSLINK;

  struct AuthorShare {
    uint256 share;
    uint256 shareInMatic;
    bool hasWithdrawnShare;
  }

  AuthorShare public author = AuthorShare(0, 0, false);
 
  struct contribution {
    address shareRecipient;
    uint256 share;
    uint256 shareInMatic;
    bool hasWithdrawnShare;
  }

  bool public shareSentToMoonlit = false;
  mapping(uint256 => contribution) public contributors;
  uint8 public contributorIndex = 0;
  bool public investingFinished = false;
  
  uint256 public MAX_PER_WALLET = 5;
  uint256 public MINT_PRICE;
  uint256 public FIRST_EDITION_MAX;
  uint256 public totalSupply = 0;
  // 15% always go to the DAO 
  uint256 public totalSharePercentage = 15;
  address constant public MOONLIT_FOUNDATION_ADDRESS = 0xc5F490B1629f6D6580F33bF53CEe23eF52cEF89C;

  bool public refundEnabled = false;

  constructor(
      string memory _title,
      string memory _subtitle,
      string memory _genre,
      address _author_address,
      string memory _author_name,
      string memory _ipfsLink,
      uint256 _initialMintPrice,
      uint256 _firstEditionMax
    ) {
        // is it ok to give MOONLIT_FOUNDATION_ADDRESS DEFAULT_ADMIN_ROLE and they have the ability to freeze the contract?
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(AUTHOR_ROLE, msg.sender);
        TITLE = _title;
        SUBTITLE = _subtitle;
        GENRE = _genre;
        AUTHOR_ADDRESS = _author_address;
        AUTHOR_NAME = _author_name;
        IPFSLINK = _ipfsLink;
        MINT_PRICE = _initialMintPrice;
        FIRST_EDITION_MAX = _firstEditionMax;
    }
  

  modifier whenInvestingFinished {
      require(investingFinished, "Investing still running");
      _;
  }

  modifier whenRefundEnabled {
    require(refundEnabled, "Refund not enabled");
    _;
  }

  function deposit(uint256 _amount) public payable {
    require((investments[msg.sender] + _amount) <= MAX_PER_WALLET, "Exceeds max per wallet.");
    require(totalSupply + _amount <= FIRST_EDITION_MAX, "Investment exceeds cap.");
    require(MINT_PRICE * _amount <= msg.value, "Value sent is not sufficient.");
    investments[msg.sender] = investments[msg.sender] + _amount;
    totalSupply = totalSupply + _amount;

    if (totalSupply == FIRST_EDITION_MAX) {
      investingFinished = true;
      calculateShares();
      // trigger the function that creates a erc1155
    }
  }

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
  }

  function addContributor(address _contributor, uint256 _share) external onlyRole(AUTHOR_ROLE) {
    // PUT BACK this check
    // require(msg.sender == AUTHOR_ADDRESS, "Not author");
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

  function enableRefund() external onlyRole(AUTHOR_ROLE) {
    require(totalSupply < FIRST_EDITION_MAX, "First edition sold out, no refund possible");
    refundEnabled = true;
  }

  function claimRefund() external whenRefundEnabled {
    require(investments[msg.sender] > 0, "Nothing to refund");
    uint256 refundAmountMatic = MINT_PRICE * investments[msg.sender];
    withdraw(msg.sender, refundAmountMatic);
  }

  function withdrawShareAuthor(address _to) external whenInvestingFinished onlyRole(AUTHOR_ROLE) {
    require(msg.sender == AUTHOR_ADDRESS, 'Not author');
    require(!author.hasWithdrawnShare, 'Share already withdrawn');
    withdraw(_to, author.shareInMatic);
    author.hasWithdrawnShare = true;
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

  function withdraw(address _to, uint256 _amount) internal {
    require(_to != address(0), "Cannot withdraw to the 0 address");
    payable(_to).transfer(_amount);
  }
}

// ROLE("MAIN_AUTHOR")
// Contributor struct should have "jobs description" inside contributr struct

// this could be a factory for a ERC 1155 - the ids could be the editions
// remix deployment constructor arguments
// "title", "subtitle", "romcom",  "0xc5F490B1629f6D6580F33bF53CEe23eF52cEF89C", "0xjules", "ipfasLinks", 10000000000000000, 4