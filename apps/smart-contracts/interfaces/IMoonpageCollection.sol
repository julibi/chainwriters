//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface IMoonpageCollection {
    function isBaseDataFrozen() external view returns (bool);

    function lastGenEd() external view returns (uint256);

    function paused() external view returns (bool);

    function withdraw(address _to, uint256 _amount) external;

    function totalSupply() external view returns (uint256);

    function balanceOf(address _owner) external view returns (uint256);

    function startAuctions(
        uint256 _projectId,
        uint256 _amountForCreator,
        uint256 _discountRate
    ) external;

    function ownerOf(uint256 _tokenId) external view returns (address);
}
