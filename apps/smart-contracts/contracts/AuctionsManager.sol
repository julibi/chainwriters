//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IMoonpageManager.sol";
import "../interfaces/IMoonpageCollection.sol";
import "../interfaces/IMoonpageFactory.sol";

// should just be ownable???
contract AuctionsManager is Pausable, Ownable {
    uint256 public constant AUCTION_DURATION = 1 days;
    IMoonpageManager public moonpageManager;
    IMoonpageFactory public moonpageFactory;
    IMoonpageCollection public moonpageCollection;

    struct AuctionSettings {
        bool exists;
        address creator;
        uint256 discountRate;
        uint256 startAt;
        uint256 expiresAt;
        bool auctionsStarted;
        bool auctionsEnded;
    }
    mapping(uint256 => AuctionSettings) public auctions;

    event AuctionsStarted(uint256 projectId, uint256 time);
    event AuctionsEnded(uint256 projectId, uint256 time);
    event ExpirationSet(uint256 projectId, uint256 expirationTime);

    modifier onlyCollection() {
        require(msg.sender == address(moonpageCollection), "Not authorized");
        _;
    }

    // ------------------
    // Gated external functions
    // -----------------

    // only called by owner
    function setContracts(
        address _manager,
        address _factory,
        address _collection
    ) external onlyOwner {
        moonpageManager = IMoonpageManager(_manager);
        moonpageFactory = IMoonpageFactory(_factory);
        moonpageCollection = IMoonpageCollection(_collection);
    }

    // only called by factory
    function setupAuctionSettings(uint256 _projectId, address _creatorAddress)
        external
        whenNotPaused
    {
        require(msg.sender == address(moonpageFactory), "Not authorized");
        require(!auctions[_projectId].exists, "Already added");

        auctions[_projectId].exists = true;
        auctions[_projectId].creator = _creatorAddress;
        auctions[_projectId].discountRate = 0;
        auctions[_projectId].startAt = 0;
        auctions[_projectId].expiresAt = 0;
        auctions[_projectId].auctionsStarted = false;
        auctions[_projectId].auctionsEnded = false;
    }

    // only called by collection
    function startAuctions(uint256 _projectId, uint256 _discountRate)
        external
        whenNotPaused
        onlyCollection
    {
        require(
            !auctions[_projectId].auctionsStarted,
            "Auctions already started"
        );
        require(!auctions[_projectId].auctionsEnded, "Auctions already ended");

        auctions[_projectId].discountRate = _discountRate;
        auctions[_projectId].startAt = block.timestamp;
        auctions[_projectId].expiresAt = block.timestamp + AUCTION_DURATION;
        auctions[_projectId].auctionsStarted = true;
        emit ExpirationSet(_projectId, block.timestamp + AUCTION_DURATION);
        emit AuctionsStarted(_projectId, block.timestamp);
    }

    // only called by collection
    function triggerNextAuction(uint256 _projectId) external onlyCollection {
        auctions[_projectId].startAt = block.timestamp;
        auctions[_projectId].expiresAt = block.timestamp + AUCTION_DURATION;
        emit ExpirationSet(_projectId, block.timestamp + AUCTION_DURATION);
    }

    // only called by collection
    function endAuctions(uint256 _projectId) external onlyCollection {
        require(!auctions[_projectId].auctionsEnded, "Already ended");
        auctions[_projectId].auctionsEnded = true;
        emit AuctionsEnded(_projectId, block.timestamp);
    }

    // ------------------
    // Ungated external functions
    // -----------------

    function retriggerAuction(uint256 _projectId) external {
        require(
            auctions[_projectId].expiresAt < block.timestamp,
            "Triggering unnecessary. Auction running."
        );
        auctions[_projectId].startAt = block.timestamp;
        auctions[_projectId].expiresAt = block.timestamp + AUCTION_DURATION;
        emit ExpirationSet(_projectId, block.timestamp + AUCTION_DURATION);
    }

    // ------------------
    // View functions
    // -----------------

    function getPrice(uint256 _projectId, uint256 _startPrice)
        public
        view
        returns (uint256)
    {
        AuctionSettings memory auctionSetting = auctions[_projectId];
        if (auctionSetting.auctionsStarted && !auctionSetting.auctionsEnded) {
            uint256 timeElapsed = block.timestamp - auctionSetting.startAt;
            uint256 discount = auctionSetting.discountRate * timeElapsed;
            return _startPrice - discount;
        }
        return 0;
    }

    function readAuctionSettings(uint256 _projectId)
        external
        view
        returns (
            bool,
            address,
            uint256,
            uint256,
            uint256,
            bool,
            bool
        )
    {
        AuctionSettings storage data = auctions[_projectId];

        return (
            data.exists,
            data.creator,
            data.discountRate,
            data.startAt,
            data.expiresAt,
            data.auctionsStarted,
            data.auctionsEnded
        );
    }
}
