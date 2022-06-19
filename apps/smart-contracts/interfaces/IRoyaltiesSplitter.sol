//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface IRoyaltiesSplitter {
    function payee(uint256 index) external view returns (address);

    function release(address account) external;

    function release(address token, address account) external;

    function released(address token, address account)
        external
        view
        returns (uint256);

    function released(address account) external view returns (uint256);

    function shares(address account) external view returns (uint256);

    function totalReleased(address token) external view returns (uint256);

    function totalReleased() external view returns (uint256);

    function totalShares() external view returns (uint256);
}
