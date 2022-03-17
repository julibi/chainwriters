//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "./MoonlitDao.sol";
import "../interfaces/IMoonlitFactory.sol";

contract MoonlitFactory is IMoonlitFactory {
  address public owner = 0x3269a7ebE0FAEdDB5028C90Be247e2d39d5C72c5;
  uint256 public firstEditionMax;
  address[] public moonlitDaos;
  event DaoInstantiated(address indexed caller, address indexed dao);

  constructor(uint256 _firstEditionMax){
    firstEditionMax = _firstEditionMax;
  }

  function createDao(
    string calldata _title,
    string calldata _subtitle,
    string calldata _genre,
    string calldata _ipfsLink,
    uint256 _initialMintPrice
  ) public returns (address) {
      MoonlitDao moonlitDao = new MoonlitDao(
        _title,
        _subtitle,
        _genre,
        msg.sender,
        _ipfsLink,
        _initialMintPrice,
        firstEditionMax
      );
      moonlitDaos.push(address(moonlitDao));
      emit DaoInstantiated(msg.sender, address(moonlitDao));
      return address(moonlitDao);
  }

  function setFirstEditionMax(uint256 _amount) public {
    require(msg.sender == owner, "Only for owner");
    firstEditionMax = _amount;
  }

  function moonlitDaosLength() external view returns (uint) {
    return moonlitDaos.length;
  }
}
