//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ProjectDao.sol";
import "../interfaces/IProjectFactory.sol";

contract ProjectFactory is IProjectFactory, Ownable {
  uint256 public firstEditionMin = 1;
  uint256 public firstEditionMax = 1700;
  address[] public projectDaos;
  event DaoCreated(
    address indexed caller,
    address indexed dao,
    string title,
    string textIpfsHash,
    uint256 initialMintPrice,
    uint256 firstEditionAmount
  );

  function createDao(
    string calldata _title,
    string calldata _textIpfsHash,
    uint256 _initialMintPrice,
    uint256 _firstEditionAmount
  ) external {
    // add check to not allow an ipfsLink that already exists
    require(_firstEditionAmount > firstEditionMin && _firstEditionAmount < firstEditionMax, "Invalid first edition amount");
    ProjectDao projectDao = new ProjectDao(
      _title,
      msg.sender,
      _textIpfsHash,
      _initialMintPrice,
      _firstEditionAmount,
      address(this)
    );
    projectDaos.push(address(projectDao));

    emit DaoCreated(
      msg.sender,
      address(projectDao),
      _title,
      _textIpfsHash,
      _initialMintPrice,
      _firstEditionAmount
    );
  }

  function setGenesisAmountRange(uint256 _min, uint256 _max) external onlyOwner {
    firstEditionMin = _min;
    firstEditionMax = _max;
  }

  function withdraw(address  _to) payable external onlyOwner {
    require(_to != address(0), "Cannot withdraw to the 0 address");
    payable(_to).transfer(address(this).balance);
  }
}
