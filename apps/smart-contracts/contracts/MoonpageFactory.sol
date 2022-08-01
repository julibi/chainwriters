//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

// Make it pausable!
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IMoonpageManager.sol";
import "../interfaces/IAuctionsManager.sol";
import "./MoonpageCollection.sol";

contract MoonpageFactory is Ownable {
    uint256 public firstEditionMin = 3;
    uint256 public firstEditionMax = 1000;
    address[] public collections;
    uint256 public collectionsLength = 0;
    IMoonpageManager public moonpageManager;
    IAuctionsManager public auctionsManager;

    constructor(address _mpManager, address _auctionsManager) {
        moonpageManager = IMoonpageManager(_mpManager);
        auctionsManager = IAuctionsManager(_auctionsManager);
    }

    function createDao(
        string calldata _title,
        string calldata _symbol,
        string calldata _textIpfsHash,
        uint256 _initialMintPrice,
        uint256 _firstEditionAmount
    ) external returns (address) {
        require(
            _firstEditionAmount > firstEditionMin &&
                _firstEditionAmount < firstEditionMax,
            "Incorrect amount"
        );
        MoonpageCollection collection = new MoonpageCollection(
            msg.sender,
            address(moonpageManager),
            address(auctionsManager),
            _initialMintPrice,
            _firstEditionAmount,
            _title,
            _symbol
        );
        moonpageManager.setupDao(
            msg.sender,
            address(collection),
            _title,
            _textIpfsHash
        );
        auctionsManager.setupAuctionSettings(address(collection));
        collections.push(address(collection));
        collectionsLength++;

        return address(collection);
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
