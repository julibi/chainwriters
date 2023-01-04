//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "./Ballot.sol";
import "../interfaces/IMoonpageManager.sol";
import "../interfaces/IMoonpageCollection.sol";

contract BallotsFactory is
    Initializable,
    PausableUpgradeable,
    AccessControlUpgradeable,
    UUPSUpgradeable
{
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    uint256 public ballotsLength;
    IMoonpageManager public moonpageManager;
    IMoonpageCollection public moonpageCollection;
    mapping(uint256 => address) public ballots;
    event BallotCreated(uint256 projectId, address ballotAddress);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address _mpManager, address _collection)
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
        moonpageCollection = IMoonpageCollection(_collection);
        ballotsLength = 0;
    }

    function createBallot(uint256 _projectId)
        external
        whenNotPaused
        returns (address)
    {
        bool projectExists = moonpageManager.exists(_projectId);
        require(projectExists, "No collection");
        (, , , address creatorAddress, , , , , , , ) = moonpageManager
            .readBaseData(_projectId);
        require(creatorAddress == msg.sender, "Not authorized");
        require(ballots[_projectId] == address(0), "Ballot already exists");

        Ballot ballot = new Ballot(
            address(moonpageCollection),
            address(moonpageManager),
            _projectId,
            msg.sender
        );
        ballots[_projectId] = address(ballot);
        ballotsLength++;
        emit BallotCreated(_projectId, address(ballot));
        return address(ballot);
    }

    // ------------------
    // Admin functions
    // -----------------

    function setContract(address _mpManager, address _collection)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        moonpageManager = IMoonpageManager(_mpManager);
        moonpageCollection = IMoonpageCollection(_collection);
    }

    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function emergencyWithdraw(address _to)
        external
        payable
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(_to != address(0), "Cannot withdraw to the 0 address");
        payable(_to).transfer(address(this).balance);
    }

    receive() external payable {}

    // ------------------
    // Explicit overrides
    // ------------------

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyRole(UPGRADER_ROLE)
    {}
}
