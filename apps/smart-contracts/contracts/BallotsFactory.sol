//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./Ballot.sol";
import "../interfaces/IMoonpageManager.sol";
import "../interfaces/IMoonpageCollection.sol";

contract BallotsFactory is Ownable, Pausable {
    uint256 public ballotsLength = 0;
    IMoonpageManager public moonpageManager;
    IMoonpageCollection public moonpageCollection;
    mapping(uint256 => address) public ballots;

    constructor(address _mpManager, address _collection) {
        moonpageManager = IMoonpageManager(_mpManager);
        moonpageCollection = IMoonpageCollection(_collection);
    }

    function createBallot(uint256 _projectId)
        external
        whenNotPaused
        returns (address)
    {
        bool projectExists = moonpageManager.exists(_projectId);
        require(projectExists, "No collection");
        (, , , address creatorAddress, , , , , ) = moonpageManager.readBaseData(
            _projectId
        );
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
        return address(ballot);
    }

    // ------------------
    // Admin functions
    // -----------------

    function setContract(address _mpManager, address _collection)
        external
        onlyOwner
    {
        moonpageManager = IMoonpageManager(_mpManager);
        moonpageCollection = IMoonpageCollection(_collection);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
