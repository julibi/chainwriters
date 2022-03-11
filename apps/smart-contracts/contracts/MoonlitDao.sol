//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract MoonlitDao is AccessControlEnumerable {
  string public NAME;
  string public DESCRIPTION;
  address public AUTHOR;
  string public IPFSLINKS;
  address public EDITOR;
  constructor(
      string memory _name,
      string memory _description,
      address _author,
      string memory _ipfsLink,
      address _editor
    ) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        NAME = _name;
        AUTHOR = _author;
        MAX_NFTS = _maxNfts;
        baseUri = _baseUri;
        mintPrice = 0.001 ether; 
        MAX_PER_MINT = 5;
        METADATA_FROZEN = false;
    }

}
