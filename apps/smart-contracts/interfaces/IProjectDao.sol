//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface IProjectDao {
    function setupDao(
        string calldata _title,
        string calldata _textCID,
        uint256 _startPrice,
        uint256 _maxAmount
    ) external;
}
