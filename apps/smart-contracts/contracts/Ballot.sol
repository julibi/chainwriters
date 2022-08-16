//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "../interfaces/IMoonpageCollection.sol";
import "../interfaces/IMoonpageManager.sol";

contract Ballot is AccessControlEnumerable {
    bytes32 public constant CREATOR_ROLE = keccak256("CREATOR_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    IMoonpageCollection public moonpageCollection;
    IMoonpageManager public moonpageManager;
    uint256 public startId;
    uint256 public endId;
    uint256 public maxVotes;
    uint256 public votingsIndex = 0;
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
    event VoteStarted(
        uint256 votingId,
        uint256 maxVotes,
        uint256 time,
        string proposal
    );
    event VoteEnded(
        uint256 votingId,
        uint256 time,
        uint256 option1Votes,
        uint256 option2Votes,
        uint256 option3Votes
    );
    event Voted(uint256 votingId, uint256 time);

    constructor(
        address _collection,
        address _mpManager,
        uint256 _projectId,
        address _creator
    ) {
        _setupRole(CREATOR_ROLE, _creator);
        moonpageCollection = IMoonpageCollection(_collection);
        moonpageManager = IMoonpageManager(_mpManager);
        (
            ,
            ,
            uint256 startTokenId,
            ,
            uint256 lastGenEdTokenId,
            ,

        ) = moonpageManager.readEditionData(_projectId);
        startId = startTokenId;
        endId = lastGenEdTokenId;
        maxVotes = lastGenEdTokenId - startTokenId + 1;
        state = State.NotVoting;
    }

    modifier authorized(uint256 _tokenId) {
        require(
            (_tokenId >= startId) &&
                (_tokenId <= endId) &&
                moonpageCollection.ownerOf(_tokenId) == msg.sender,
            "Not authorized"
        );
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
        emit VoteStarted(votingsIndex, maxVotes, block.timestamp, _proposal);
    }

    function endVote() external onlyRole(CREATOR_ROLE) inState(State.Voting) {
        bool allVoted = voteSettings[votingsIndex].votesCount == maxVotes;
        bool voteExpired = block.timestamp > voteSettings[votingsIndex].endTime;
        require(allVoted || voteExpired, "Vote not yet expired");
        state = State.NotVoting;
        votingsIndex++;
        emit VoteEnded(
            votingsIndex,
            block.timestamp,
            voteSettings[votingsIndex].option1Votes,
            voteSettings[votingsIndex].option2Votes,
            voteSettings[votingsIndex].option3Votes
        );
    }

    function vote(uint256 _tokenId, uint256 _option)
        external
        authorized(_tokenId)
        inState(State.Voting)
    {
        require(!votings[votingsIndex][_tokenId].voted, "Already voted");
        require(_option == 0 || _option == 1 || _option == 2, "Invalid option");
        require(
            voteSettings[votingsIndex].votesCount + 1 <= maxVotes,
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
        emit Voted(votingsIndex, block.timestamp);
    }
}
