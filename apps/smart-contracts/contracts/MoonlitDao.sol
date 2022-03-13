//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract MoonlitDao is AccessControlEnumerable {
  mapping(address => uint256) public investments;
  string public TITLE;
  string public SUBTITLE;
  string public GENRE;
  address public AUTHOR_ADDRESS;
  string public AUTHOR_NAME;
  string public IPFSLINK;

  address public contributor_1;
  address public contributor_2;
  address public contributor_3;
  bool public contributorsSet;
  
  uint256 public MAX_PER_WALLET = 5;
  uint256 public INITIAL_MINT_PRICE;
  uint256 public FIRST_EDITION_MAX;
  uint256 public totalSupply = 0;

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
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        TITLE = _title;
        SUBTITLE = _subtitle;
        GENRE = _genre;
        AUTHOR_ADDRESS = _author_address;
        AUTHOR_NAME = _author_name;
        IPFSLINK = _ipfsLink;
        INITIAL_MINT_PRICE = _initialMintPrice;
        FIRST_EDITION_MAX = _firstEditionMax;
    }
  
  function deposit(uint256 _amount) public payable {
    require((investments[msg.sender] + _amount) <= MAX_PER_WALLET, "Exceeds max per wallet.");
    require(totalSupply + _amount <= FIRST_EDITION_MAX, "Investment exceeds cap.");
    require(INITIAL_MINT_PRICE * _amount <= msg.value, "Value sent is not sufficient.");
    investments[msg.sender] = investments[msg.sender] + _amount;
    totalSupply = totalSupply + _amount;
  }

  // TODO next: withdraw mit prozentualem Anteil

  function balanceOfContract() public view returns(uint256) { 
    uint256 balance = address(this).balance;
    return balance;
  }

  function setContributor(address _contributor1, address _contributor2, address _contributor3) public {
    require(msg.sender == AUTHOR_ADDRESS, "Not author");
    require(!contributorsSet, "Contributors already set");
    contributor_1 = _contributor1;
    contributor_2 = _contributor2;
    contributor_3 = _contributor3;
    contributorsSet = true;
  }
}

// this could be a factory for a ERC 1155 - the ids could be the editions