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
    uint256 public projectId;
    uint256 public startId;
    uint256 public endId;
    uint256 public maxVotes;
    uint256 public votingsIndex = 0;

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

    mapping(uint256 => mapping(uint256 => SingleVote)) public votings;
    mapping(uint256 => Setting) public voteSettings;
    event VoteStarted(
        uint256 projectId,
        uint256 votingId,
        uint256 maxVotes,
        uint256 endTime,
        string proposal,
        string option1,
        string option2,
        string option3
    );
    event VoteEnded(
        uint256 projectId,
        uint256 votingId,
        uint256 option1Votes,
        uint256 option2Votes,
        uint256 option3Votes
    );
    event Voted(
        uint256 projectId,
        uint256 votingId,
        uint256 option,
        uint256 counts
    );

    constructor(
        address _collection,
        address _mpManager,
        uint256 _projectId,
        address _creator,
        string[] memory _firstVoteParams,
        uint256 _firstVoteEnd
    ) {
        _setupRole(CREATOR_ROLE, _creator);
        moonpageCollection = IMoonpageCollection(_collection);
        moonpageManager = IMoonpageManager(_mpManager);
        (, , uint256 startTokenId, , , , uint256 endTokenId) = moonpageManager
            .readEditionData(_projectId);
        startId = startTokenId;
        endId = endTokenId;
        maxVotes = endTokenId - startTokenId + 1;
        projectId = _projectId;

        string[] memory firstVoteOptions = new string[](3);
        firstVoteOptions[0] = _firstVoteParams[1];
        firstVoteOptions[1] = _firstVoteParams[2];
        firstVoteOptions[2] = _firstVoteParams[3];

        _startFirstVote(_firstVoteParams[0], firstVoteOptions, _firstVoteEnd);
    }

    modifier authorized(uint256[] calldata _tokenIds) {
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            require(
                (_tokenIds[i] >= startId) &&
                    (_tokenIds[i] <= endId) &&
                    moonpageCollection.ownerOf(_tokenIds[i]) == msg.sender,
                "Not authorized"
            );
            require(
                !votings[votingsIndex][_tokenIds[i]].voted,
                "Already voted"
            );
        }
        _;
    }

    function startVote(
        string memory _proposal,
        string[] memory _optionValues,
        uint256 _end
    ) external onlyRole(CREATOR_ROLE) {
        endPreviousVote();

        _startVote(_proposal, _optionValues, _end);
    }

    function _startFirstVote(
        string memory _proposal,
        string[] memory _optionValues,
        uint256 _end
    ) private {
        _startVote(_proposal, _optionValues, _end);
    }

    function _startVote(
        string memory _proposal,
        string[] memory _optionValues,
        uint256 _end
    ) private {
        require(
            _end >= (block.timestamp + 10 minutes),
            "Not enough time to vote"
        );
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
        voteSettings[votingsIndex].endTime = _end;

        emit VoteStarted(
            projectId,
            votingsIndex,
            maxVotes,
            _end,
            _proposal,
            _optionValues[0],
            _optionValues[1],
            _optionValues[2]
        );
    }

    function endPreviousVote() private {
        bool allVoted = voteSettings[votingsIndex].votesCount == maxVotes;
        bool voteExpired = block.timestamp > voteSettings[votingsIndex].endTime;
        require(allVoted || voteExpired, "Vote not yet expired");

        emit VoteEnded(
            projectId,
            votingsIndex,
            voteSettings[votingsIndex].option1Votes,
            voteSettings[votingsIndex].option2Votes,
            voteSettings[votingsIndex].option3Votes
        );
        votingsIndex++;
    }

    function vote(uint256[] calldata _tokenIds, uint256 _option)
        external
        authorized(_tokenIds)
    {
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
            voteSettings[votingsIndex].option1Votes =
                voteSettings[votingsIndex].option1Votes +
                _tokenIds.length;
        } else if (_option == 1) {
            voteSettings[votingsIndex].option2Votes =
                voteSettings[votingsIndex].option2Votes +
                _tokenIds.length;
        } else {
            voteSettings[votingsIndex].option3Votes =
                voteSettings[votingsIndex].option3Votes +
                _tokenIds.length;
        }

        for (uint256 i = 0; i < _tokenIds.length; i++) {
            votings[votingsIndex][_tokenIds[i]].vote = _option;
            votings[votingsIndex][_tokenIds[i]].voted = true;
            voteSettings[votingsIndex].votesCount++;
        }

        emit Voted(projectId, votingsIndex, _option, _tokenIds.length);
    }
}
