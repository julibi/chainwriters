//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface IAuctionsManager {
    function setContracts(
        address _manager,
        address _factory,
        address _collection
    ) external;

    function setupAuctionSettings(uint256 _projectId) external;

    function getPrice(uint256 _projectId, uint256 _startPrice)
        external
        returns (uint256);

    function triggerNextAuction(uint256 _projectId) external;

    function startAuctions(
        uint256 _projectId,
        uint256 _amountForCreator,
        uint256 _discountRate
    ) external;

    function endAuctions(uint256 _projectId) external;

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
        );
}
