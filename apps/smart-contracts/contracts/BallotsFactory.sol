//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

// Make it pausable!
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Ballot.sol";
import "../interfaces/IMoonpageCollection.sol";
import "../interfaces/IMoonpageManager.sol";

contract BallotsFactory is Ownable {
    uint256 public ballotsLength = 0;
    IMoonpageManager public manager;
    IMoonpageCollection public collection;
    mapping(address => address) public ballots;

    constructor(address _mpManager) {
        manager = IMoonpageManager(_mpManager);
    }

    function createBallot(address _collection) external {
        (, , , address authorAddress, , , , ) = manager.readBaseData(
            _collection
        );

        require(authorAddress != address(0), "No collection");
        require(authorAddress == msg.sender, "Not authorized");
        require(ballots[_collection] == address(0), "Ballot already exists");

        Ballot ballot = new Ballot(_collection, msg.sender);
        ballots[_collection] = address(ballot);
        ballotsLength++;
    }

    function withdraw(address _to) external payable onlyOwner {
        require(_to != address(0), "Cannot withdraw to the 0 address");
        payable(_to).transfer(address(this).balance);
    }
}
