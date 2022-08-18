//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "../interfaces/IMoonpageManager.sol";
import "../interfaces/IAuctionsManager.sol";

contract MoonpageFactoryV2 is
    Initializable,
    PausableUpgradeable,
    AccessControlUpgradeable,
    UUPSUpgradeable
{
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    uint256 public projectsIndex;
    uint256 public firstEditionMin;
    uint256 public firstEditionMax;
    IMoonpageManager public moonpageManager;
    IAuctionsManager public auctionsManager;
    event ProjectCreated(
        address creator,
        uint256 projectId,
        string title,
        string textIpfsHash,
        string originalLanguage,
        uint256 initialMintPrice,
        uint256 firstEditionAmount
    );

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address _mpManager, address _auctionsManager)
        public
        initializer
    {
        __Pausable_init();
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);

        moonpageManager = IMoonpageManager(_mpManager);
        auctionsManager = IAuctionsManager(_auctionsManager);
        projectsIndex = 1;
        firstEditionMin = 5;
        firstEditionMax = 1000;
    }

    function createProject(
        string calldata _title,
        string calldata _textIpfsHash,
        string calldata _originalLanguage,
        uint256 _initialMintPrice,
        uint256 _firstEditionAmount
    ) external whenNotPaused {
        require(
            _firstEditionAmount > firstEditionMin &&
                _firstEditionAmount < firstEditionMax,
            "Incorrect amount"
        );
        moonpageManager.setupDao(
            msg.sender,
            projectsIndex,
            _title,
            _textIpfsHash,
            _originalLanguage,
            _initialMintPrice,
            _firstEditionAmount
        );
        auctionsManager.setupAuctionSettings(projectsIndex, msg.sender);
        emit ProjectCreated(
            msg.sender,
            projectsIndex,
            _title,
            _textIpfsHash,
            _originalLanguage,
            _initialMintPrice,
            _firstEditionAmount
        );
        projectsIndex++;
    }

    // ------------------
    // Admin functions
    // -----------------

    function setContracts(address _mpManager, address _aManager)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        moonpageManager = IMoonpageManager(_mpManager);
        auctionsManager = IAuctionsManager(_aManager);
    }

    function setGenesisAmountRange(uint256 _min, uint256 _max)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        firstEditionMin = _min;
        firstEditionMax = _max;
    }

    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function withdraw(address _to)
        external
        payable
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(_to != address(0), "Cannot withdraw to the 0 address");
        payable(_to).transfer(address(this).balance);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyRole(UPGRADER_ROLE)
    {}

    receive() external payable {}
}
