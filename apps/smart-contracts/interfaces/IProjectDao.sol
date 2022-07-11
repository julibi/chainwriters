//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface IProjectDao {
    function setupDao(
        address _caller,
        address _collection,
        string calldata _title,
        string calldata _textCID,
        uint256 _startPrice,
        uint256 _maxAmount
    ) external;

    function distributeShares() external;

    function readBaseData(address _collection)
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            address,
            string memory,
            string memory,
            string memory,
            bool
        );

    function readEdition(address _collection)
        external
        view
        returns (
            uint256,
            uint256,
            uint256
        );

    function readAuthorShare(address _collection)
        external
        view
        returns (uint256, uint256);

    function readContribution(address _collection, uint256 _index)
        external
        view
        returns (
            address,
            string memory,
            uint256,
            uint256
        );

    function readContributionIndex(address _collection)
        external
        view
        returns (uint256);
}
