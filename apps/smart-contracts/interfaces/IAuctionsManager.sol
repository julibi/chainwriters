//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface IAuctionsManager {
    function setupAuctionSettings(address _collection) external;

    function startAuctions(
        address _collection,
        uint256 _amountForCreator,
        uint256 _discountRate
    ) external;

    function getPrice(address _collection, uint256 _startPrice)
        external
        returns (uint256);

    function triggerNextAuction(address _collection) external;

    function endAuctions(address _collection) external;

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
        );
}
