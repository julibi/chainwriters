//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "../interfaces/IMoonpageManager.sol";
import "../interfaces/IMoonpageCollection.sol";
import "../interfaces/IMoonpageFactory.sol";

contract AuctionsManager is Pausable, AccessControl {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    uint256 public constant AUCTION_DURATION = 1 days;
    IMoonpageManager public moonpageManager;
    IMoonpageFactory public moonpageFactory;

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

    event AuctionsStarted(
        address collection,
        uint256 premintedAmount,
        uint256 time
    );
    event AuctionsEnded(uint256 projectId, uint256 time);
    event ExpirationSet(uint256 projectId, uint256 expirationTime);

    modifier onlyCollection() {
        require(auctions[msg.sender].exists, "Not authorized");
        _;
    }

    constructor() {
        _setupRole(PAUSER_ROLE, msg.sender);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // ------------------
    // Gated external functions
    // -----------------

    function setContracts(address _manager, address _factory)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        moonpageManager = IMoonpageManager(_manager);
        moonpageFactory = IMoonpageFactory(_factory);
    }

    // only called by factory
    function setupAuctionSettings(uint256 _projectId) external {
        require(msg.sender == address(moonpageFactory), "Not authorized");
        require(!auctions[_projectId].exists, "Already added");
        (, , , address authorAddress, , , , ) = moonpageManager.readBaseData(
            _projectId
        );
        auctions[_projectId].exists = true;
        auctions[_projectId].creator = authorAddress;
        auctions[_projectId].discountRate = 0;
        auctions[_projectId].startAt = 0;
        auctions[_projectId].expiresAt = 0;
        auctions[_projectId].auctionsStarted = false;
        auctions[_projectId].auctionsEnded = false;
    }

    // only called by a collection
    function startAuctions(
        uint256 _projectId,
        uint256 _amountForCreator,
        uint256 _discountRate
    ) external whenNotPaused onlyCollection {
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
        emit AuctionsStarted(_projectId, _amountForCreator, block.timestamp);
    }

    // only called by a collection
    function triggerNextAuction(uint256 _projectId) external onlyCollection {
        auctions[_projectId].startAt = block.timestamp;
        auctions[_projectId].expiresAt = block.timestamp + AUCTION_DURATION;
        emit ExpirationSet(_projectId, block.timestamp + AUCTION_DURATION);
    }

    function endAuctions(uint256 _projectId) external onlyCollection {
        require(!auctions[_projectId].auctionsEnded, "Already ended");
        auctions[_projectId].auctionsEnded = true;
        emit AuctionsEnded(_projectId, block.timestamp);
    }

    // ------------------
    // Ungated external functions
    // -----------------

    function retriggerAuction(address _collection) external {
        require(
            auctions[_collection].expiresAt < block.timestamp,
            "Triggering unnecessary. Auction running."
        );
        auctions[_collection].startAt = block.timestamp;
        auctions[_collection].expiresAt = block.timestamp + AUCTION_DURATION;
        emit ExpirationSet(_collection, block.timestamp + AUCTION_DURATION);
    }

    // ------------------
    // View functions
    // -----------------

    function getPrice(address _collection, uint256 _startPrice)
        public
        view
        returns (uint256)
    {
        AuctionSettings memory auctionSetting = auctions[_collection];
        if (auctionSetting.auctionsStarted && !auctionSetting.auctionsEnded) {
            uint256 timeElapsed = block.timestamp - auctionSetting.startAt;
            uint256 discount = auctionSetting.discountRate * timeElapsed;
            return _startPrice - discount;
        }
        return 0;
    }

    function readAuctionSettings(address _collection)
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
        AuctionSettings storage data = auctions[_collection];

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
