//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface IMoonpageCollection {
    function auctionPhaseFinished() external view returns (bool);

    function auctionsStarted() external view returns (bool);

    function paused() external view returns (bool);

    function withdraw(address _to, uint256 _amount) external;

    function totalSupply() external view returns (uint256);

    function balanceOf(address _owner) external view returns (uint256);
}
