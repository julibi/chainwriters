//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract MoonlitDao is AccessControlEnumerable {
  string public NAME;
  string public DESCRIPTION;
  address public AUTHOR_ADDRESS;
  string public AUTHOR_NAME;
  string public IPFSLINKS;
  address public EDITOR;
  mapping(address => uint256) public investments;
  uint256 public investorCount = 0;
  uint256 maxInvestmentPerWallet;
  uint256 minInvestmentAmount = 10000000000000000; // 0.01 matic
  uint256 maxInvestmentAmount = 50000000000000000; // 0.05 matic

  constructor(
      string memory _name,
      string memory _description,
      address _author_address,
      string memory _author_name,
      string memory _ipfsLink,
      address _editor
    ) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        NAME = _name;
        DESCRIPTION = _description;
        AUTHOR_ADDRESS = _author_address;
        AUTHOR_NAME = _author_name;
        IPFSLINKS = _ipfsLink;
        EDITOR = _editor;
    }
  
  function deposit() public payable {
    if (investments[msg.sender] == 0) {
      investorCount = investorCount + 1;
    }
    investments[msg.sender] = investments[msg.sender] + msg.value;
  }

  function balanceOfContract() public view returns(uint256) { 
    uint256 balance = address(this).balance;
    return balance;
  }
}
