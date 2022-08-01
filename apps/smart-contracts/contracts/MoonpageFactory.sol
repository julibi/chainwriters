//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

// Make it pausable!
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "../interfaces/IMoonpageManager.sol";
import "../interfaces/IAuctionsManager.sol";
import "./MoonpageCollection.sol";

contract MoonpageFactory is Ownable, Pausable {
    uint256 public firstEditionMin = 3;
    uint256 public firstEditionMax = 1000;
    address[] public collections;
    uint256 public collectionsLength = 0;
    IMoonpageManager public moonpageManager;
    IAuctionsManager public auctionsManager;
    event CollectionCreated(
      address indexed caller,
      address indexed collection,
      string title,
      string textIpfsHash,
      uint256 initialMintPrice,
      uint256 firstEditionAmount
    );

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
    ) external whenNotPaused returns (address) {
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
        emit CollectionCreated(
          msg.sender,
          address(collection),
          _title,
          _textIpfsHash,
          _initialMintPrice,
          _firstEditionAmount
        ) ;
        return address(collection);
    }

    // ------------------
    // Admin functions
    // -----------------

    function setContracts(address _mpManager, address _aManager)
        external
        onlyOwner
        whenNotPaused
    {
        moonpageManager = IMoonpageManager(_mpManager);
        auctionsManager = IAuctionsManager(_aManager);
    }

    function setGenesisAmountRange(uint256 _min, uint256 _max)
        external
        onlyOwner
        whenNotPaused
    {
        firstEditionMin = _min;
        firstEditionMax = _max;
    }

    function withdraw(address _to) external payable onlyOwner whenNotPaused {
        require(_to != address(0), "Cannot withdraw to the 0 address");
        payable(_to).transfer(address(this).balance);
    }

    receive() external payable {}

        // ------------------
    // Admin Functions
    // ------------------

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
