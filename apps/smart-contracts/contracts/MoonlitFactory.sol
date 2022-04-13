//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "./MoonlitDao.sol";
import "../interfaces/IMoonlitFactory.sol";

contract MoonlitFactory is IMoonlitFactory {
  address public owner;
  uint256 public firstEditionMin = 1;
  uint256 public firstEditionMax = 1700;
  address[] public moonlitDaos;
  event DaoInstantiated(
    address indexed caller,
    address indexed dao,
    string title,
    string textIpfsHash,
    uint256 initialMintPrice,
    uint256 firstEditionAmount
  );

  modifier onlyOwner {
    require(msg.sender == owner, "Only for owner");
    _;
  }

  constructor(){
    owner = msg.sender;
  }

  function createDao(
    string calldata _title,
    string calldata _textIpfsHash,
    uint256 _initialMintPrice,
    uint256 _firstEditionAmount
  ) public returns (address) {
    // add check to not allow an ipfsLink that already exists
    require(_firstEditionAmount > firstEditionMin && _firstEditionAmount < firstEditionMax, "Invalid first edition amount");
    MoonlitDao moonlitDao = new MoonlitDao(
      _title,
      msg.sender,
      _textIpfsHash,
      _initialMintPrice,
      _firstEditionAmount,
      address(this)
    );
    moonlitDaos.push(address(moonlitDao));
    emit DaoInstantiated(
      msg.sender,
      address(moonlitDao),
      _title,
      _textIpfsHash,
      _initialMintPrice,
      _firstEditionAmount);
    return address(moonlitDao);
  }

  function setFirstEditionMinMax(uint256 _min, uint256 _max) public onlyOwner {
    firstEditionMin = _min;
    firstEditionMax = _max;
  }

  function transferOwnership(address _newOwner) public onlyOwner {
    owner = _newOwner;
  }
}
