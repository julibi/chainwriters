//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface IProjectCollection {
    function auctionPhaseFinished() external view returns (bool);

    function auctionsStarted() external view returns (bool);

    function paused() external view returns (bool);

    function withdraw(address _to, uint256 _amount) external;

    function totalSupply(uint256) external view returns (uint256);

    function balanceOf(address _owner, uint256 _token)
        external
        view
        returns (uint256);
}
