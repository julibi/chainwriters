//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "../interfaces/IMoonpageCollection.sol";
import "../interfaces/IMoonpageManager.sol";

contract Ballot is AccessControlEnumerable, Pausable {
    bytes32 public constant CREATOR_ROLE = keccak256("CREATOR_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    IMoonpageCollection public collection;
    uint256 public maxId;
    enum State {
        Voting,
        NotVoting
    }
    State public state;
    struct SingleVote {
        bool voted;
        uint256 vote;
    }
    struct Setting {
        string proposal;
        uint256 option1Key;
        uint256 option2Key;
        uint256 option3Key;
        string option1Value;
        string option2Value;
        string option3Value;
        uint256 option1Votes;
        uint256 option2Votes;
        uint256 option3Votes;
        uint256 votesCount;
        uint256 endTime;
    }

    mapping(uint256 => mapping(uint256 => SingleVote)) internal votings;
    mapping(uint256 => Setting) public voteSettings;
    uint256 public maxVotes;
    uint256 public votingsIndex = 0;

    constructor(address _collection, address _creator) {
        _setupRole(PAUSER_ROLE, _creator);
        _setupRole(CREATOR_ROLE, _creator);
        collection = IMoonpageCollection(_collection);
        maxId = collection.lastGenEd();
        state = State.NotVoting;
    }

    modifier authorized() {
        require(collection.balanceOf(msg.sender) > 0, "Not authorized");
        _;
    }

    modifier inState(State _state) {
        require(state == _state, "Impossible at this state");
        _;
    }

    function startVote(
        string memory _proposal,
        string[] memory _optionValues,
        bool _isLongVote
    ) external onlyRole(CREATOR_ROLE) inState(State.NotVoting) {
        require(_optionValues.length == 3, "Must be three options");

        voteSettings[votingsIndex].proposal = _proposal;
        voteSettings[votingsIndex].option1Key = 0;
        voteSettings[votingsIndex].option2Key = 1;
        voteSettings[votingsIndex].option3Key = 2;
        voteSettings[votingsIndex].option1Value = _optionValues[0];
        voteSettings[votingsIndex].option2Value = _optionValues[1];
        voteSettings[votingsIndex].option3Value = _optionValues[2];
        voteSettings[votingsIndex].option1Votes = 0;
        voteSettings[votingsIndex].option2Votes = 0;
        voteSettings[votingsIndex].option3Votes = 0;
        if (_isLongVote) {
            voteSettings[votingsIndex].endTime = block.timestamp + 30 days;
        }
        voteSettings[votingsIndex].endTime = block.timestamp + 7 days;
        state = State.Voting;
    }

    function endVote() external onlyRole(CREATOR_ROLE) inState(State.Voting) {
        bool allVoted = voteSettings[votingsIndex].votesCount == maxId;
        bool voteExpired = block.timestamp > voteSettings[votingsIndex].endTime;
        require(allVoted || voteExpired, "Vote not yet expired");
        state = State.NotVoting;
        votingsIndex++;
    }

    function vote(uint256 _tokenId, uint256 _option)
        external
        authorized
        inState(State.Voting)
    {
        require(
            collection.ownerOf(_tokenId) == msg.sender,
            "Not owner of this NFT"
        );
        require(!votings[votingsIndex][_tokenId].voted, "Already voted");
        require(_option == 0 || _option == 1 || _option == 2, "Invalid option");
        require(
            voteSettings[votingsIndex].votesCount + 1 <= maxId,
            "Max votes reached"
        );
        require(
            block.timestamp < voteSettings[votingsIndex].endTime,
            "Vote expired"
        );
        if (_option == 0) {
            voteSettings[votingsIndex].option1Votes++;
        } else if (_option == 1) {
            voteSettings[votingsIndex].option2Votes++;
        } else {
            voteSettings[votingsIndex].option3Votes++;
        }
        votings[votingsIndex][_tokenId].vote = _option;
        votings[votingsIndex][_tokenId].voted = true;
        voteSettings[votingsIndex].votesCount++;
    }
}
