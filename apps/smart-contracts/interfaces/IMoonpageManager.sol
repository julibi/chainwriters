//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface IMoonpageManager {
    function setupProject(
        address _caller,
        address _royaltiesSplitter,
        uint256 _projectId,
        string calldata _title,
        string calldata _textCID,
        string calldata _originalLanguage,
        uint256 _initialMintPrice,
        uint256 _firstEditionAmount
    ) external;

    function distributeShares(uint256 _projectId) external;

    function increaseBalance(uint256 _projectId, uint256 _amount) external;

    function increaseCurrentTokenId(uint256 _projectId) external;

    function setIsBaseDataFrozen(uint256 _projectId, bool _shouldBeFrozen)
        external;

    function setIsPaused(uint256 _projectId, bool _state) external;

    function setPremintedByCreator(
        uint256 _projectId,
        uint256 _premintedByCreator
    ) external;

    function projectIdOfToken(uint256 _projectId)
        external
        view
        returns (uint256);

    function exists(uint256 _projectId) external view returns (bool);

    function isPaused(uint256 _projectId) external view returns (bool);

    function readBaseData(uint256 _projectId)
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            address,
            address,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256
        );

    function readAuthorShare(uint256 _projectId)
        external
        view
        returns (uint256, uint256);

    function readEditionData(uint256 _projectId)
        external
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256
        );

    function readContribution(uint256 _projectId, uint256 _index)
        external
        view
        returns (
            address,
            string memory,
            uint256,
            uint256
        );

    function readContributionIndex(uint256 _projectId)
        external
        view
        returns (uint256);

    function editionOfToken(uint256 _projectId, uint256 _tokenId)
        external
        view
        returns (uint256);
}
