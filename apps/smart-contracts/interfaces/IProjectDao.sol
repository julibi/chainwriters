//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface IProjectDao {
    function setupDao(
        address _collection,
        string calldata _title,
        string calldata _textCID,
        uint256 _startPrice,
        uint256 _maxAmount
    ) external;

    function baseDatas(address)
        external
        view
        returns (
            string calldata,
            string calldata,
            string calldata,
            address,
            string calldata,
            string calldata,
            string calldata,
            uint256,
            bool
        );

    function editions(address)
        external
        view
        returns (
            uint256,
            uint256,
            uint256
        );

    function authorShares(address)
        external
        view
        returns (
            uint256,
            uint256,
            uint256
        );
}
