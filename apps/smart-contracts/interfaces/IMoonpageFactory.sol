//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface IMoonpageFactory {
    function createDao(
        string calldata _title,
        string calldata _symbol,
        string calldata _textIpfsHash,
        uint256 _initialMintPrice,
        uint256 _firstEditionAmount
    ) external returns (address);

    function firstEditionMax() external view returns (uint256);

    function firstEditionMin() external view returns (uint256);

    function collections(uint256) external view returns (address);

    function setGenesisAmountRange(uint256 _min, uint256 _max) external;

    function withdraw(address _to) external payable;
}
