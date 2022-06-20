//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;
import "./ProjectDao.sol";

contract GenesisEditionAuctions {
    uint256 public AUCTION_DURATION = 1 days;
    uint256 public discountRate;
    uint256 public initialMintPrice;
    uint256 public startAt;
    uint256 public expiresAt;
    bool public auctionStarted = false;
    bool public auctionPhaseFinished = false;
    ProjectDao public collection;

    // do not import Contract, but use Interface

    event AuctionsStarted();
    event AuctionsEnded();
    event ExpirationSet(uint256 edition, uint256 expirationTime);

    modifier whenNotPaused() {
        _whenNotPaused();
        _;
    }

    constructor(
        address _collection,
        uint256 _discountRate,
        uint256 _initialMintPrice
    ) {
        collection = ProjectDao(_collection);
        discountRate = _discountRate;
        initialMintPrice = _initialMintPrice;
        startAt = block.timestamp;
        expiresAt = block.timestamp + AUCTION_DURATION;
        auctionStarted = true;
        emit AuctionsStarted();
        emit ExpirationSet(1, expiresAt);
    }

    receive() external payable {}

    function retriggerAuction() external {
        require(
            expiresAt < block.timestamp,
            "Triggering unnecessary. Auction running."
        );
        startAt = block.timestamp;
        expiresAt = block.timestamp + AUCTION_DURATION;
        emit ExpirationSet(1, expiresAt);
    }

    function buy() external payable whenNotPaused {
        uint256 available = collection.balanceOf(address(this), 1);
        require(auctionStarted, "Auctions have not started");
        require(!auctionPhaseFinished, "Auctions finished");
        require(
            expiresAt > block.timestamp,
            "Auction ended. Trigger a new one."
        );
        require(available >= 1, "Sold out");
        bool shouldFinalize = 1 == available;
        uint256 price = getPrice();
        require(msg.value >= price, "Value sent not sufficient.");

        collection.safeTransferFrom(address(this), msg.sender, 1, 1, "");
        if (shouldFinalize) {
            auctionPhaseFinished = true;
            payable(address(collection)).transfer(address(this).balance);
            collection.distributeShares();
            emit AuctionsEnded();
        } else {
            triggerNextAuction();
        }
    }

    // ------------------
    // View functions
    // -----------------

    function getPrice() public view returns (uint256) {
        if (auctionStarted && !auctionPhaseFinished) {
            uint256 timeElapsed = block.timestamp - startAt;
            uint256 discount = discountRate * timeElapsed;
            return initialMintPrice - discount;
        }
        return 0;
    }

    function _whenNotPaused() private view {
        require(!collection.paused(), "Auctions have already started.");
    }

    // ------------------
    // Private functions
    // ------------------

    function triggerNextAuction() private {
        startAt = block.timestamp;
        expiresAt = block.timestamp + AUCTION_DURATION;
        emit ExpirationSet(1, expiresAt);
    }
}
