//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./MoonlitDao.sol";

// contract MoonlitFactory is IMoonlitFactory, Ownable {
contract MoonlitFactory is Ownable {
  uint256 public firstEditionMax;
  address[] public override moonlitDaos;
  event DaoInstantiated(address indexed caller, address indexed dao);

  constructor(uint256 _firstEditionMax){
    firstEditionMax = _firstEditionMax;
  }

  function createDao(
    string memory _title,
    string memory _subtitle,
    string memory _genre,
    string memory _author_name,
    string memory _ipfsLink,
    uint256 _initialMintPrice
  ) public payable {
      MoonlitDao moonlitDao = new MoonlitDao(
        _title,
        _subtitle,
        _genre,
        msg.sender,
        _author_name,
        _ipfsLink,
        _initialMintPrice,
        firstEditionMax,
        // this
        address(this)
      );
      moonlitDaos.push(address(moonlitDao));
      emit DaoInstantiated(msg.sender, address(moonlitDao));
      return address(moonlitDao);
  }

  function setFirstEditionMax(uint256 _amount) onlyOwner {
    firstEditionMax = _amount;
  }

  function moonlitDaosLength() external override view returns (uint) {
    return moonlitDaos.length;
  }
}
