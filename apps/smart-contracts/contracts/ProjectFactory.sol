//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

// Make it pausable!
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IProjectDao.sol";
import "../interfaces/IProjectCollection.sol";

contract ProjectFactory is Ownable {
    uint256 public firstEditionMin = 1;
    uint256 public firstEditionMax = 1700;
    address[] public collections;
    uint256 public collectionsLength = 0;
    // naming sucks
    IProjectDao public projectDao;

    constructor(address _dao) {
        projectDao = IProjectDao(_dao);
    }

    function createDao(
        string calldata _title,
        string calldata _textIpfsHash,
        uint256 _initialMintPrice,
        uint256 _firstEditionAmount
    ) external {
        projectDao.setupDao(
            _title,
            _textIpfsHash,
            _initialMintPrice,
            _firstEditionAmount
        );

        collectionsLength++;
    }

    function setGenesisAmountRange(uint256 _min, uint256 _max)
        external
        onlyOwner
    {
        firstEditionMin = _min;
        firstEditionMax = _max;
    }

    function withdraw(address _to) external payable onlyOwner {
        require(_to != address(0), "Cannot withdraw to the 0 address");
        payable(_to).transfer(address(this).balance);
    }

    receive() external payable {}
}
