//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./MoonlitDao.sol";
import "../interfaces/IMoonlitFactory.sol";

// a comment to change bytecode

contract MoonlitFactory is IMoonlitFactory, Ownable {
  uint256 public firstEditionMin = 1;
  uint256 public firstEditionMax = 1700;
  address[] public moonlitDaos;
  // event DaoCreated(
  //   address indexed caller,
  //   address indexed dao,
  //   string title,
  //   string textIpfsHash,
  //   uint256 initialMintPrice,
  //   uint256 firstEditionAmount
  // );
  event Random(address indexed caller);

  function createDao(
    string calldata _title,
    string calldata _textIpfsHash,
    uint256 _initialMintPrice,
    uint256 _firstEditionAmount
  ) external {
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

    // emit DaoCreated(
    //   msg.sender,
    //   address(moonlitDao),
    //   _title,
    //   _textIpfsHash,
    //   _initialMintPrice,
    //   _firstEditionAmount
    // );
  }

  function setFirstEditionMinMax(uint256 _min, uint256 _max) external onlyOwner {
    emit Random(msg.sender);
    firstEditionMin = _min;
    firstEditionMax = _max;
  }
}
