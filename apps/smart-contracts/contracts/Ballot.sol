//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "../interfaces/IProjecCollection.sol";

contract Ballot is AccessControlEnumerable, Pausable {
    bytes32 public constant AUTHOR_ROLE = keccak256("AUTHOR_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    IProjecCollection public collection;

    address public factory;
    enum State {
        Voting,
        NotVoting
    }
    State public state;
    struct SingleVote {
        bool voted;
        uint8 vote;
    }
    struct Setting {
        string proposal;
        uint8 option1Key;
        uint8 option2Key;
        uint8 option3Key;
        string option1Value;
        string option2Value;
        string option3Value;
        uint256 option1Votes;
        uint256 option2Votes;
        uint256 option3Votes;
        uint256 maxVotes;
        uint256 totalVotesCount;
    }

    mapping(uint256 => mapping(address => SingleVote)) private votings;
    mapping(uint256 => Setting) public voteSettings;
    uint256 public maxVotes;
    uint256 public votingsIndex = 0;

    constructor(
        address _factory,
        address _collection,
        address _creator
    ) {
        name = _title;
        factory = _factory;
        daoManager = IProjectDao(_daoManager);
        // moonpage should always be able to pause
        // _setupRole(PAUSER_ROLE, _factory);
        _setupRole(PAUSER_ROLE, _creator);
        _setupRole(AUTHOR_ROLE, _creator);
        collection = IProjecCollection(_collection);
    }

    modifier authorized() {
        require(collection.balanceOf(msg.sender, 1) > 0, "Not authorized");
        _;
    }

    function startVote(
        string _proposal,
        uint8[] _optionKeys,
        string[] _optionValues,
        bool _longVote
    ) external onlyRole(AUTHOR_ROLE) {
        require(_optionsKey.length == 3, "Must be three options");
        require(
            _optionsKey.length == _optionsValue.length,
            "Key and vale must be same length"
        );
        require(state == State.NotVoting, "Vote already running");
        require(votingsIndex);

        Setting newSetting = voteSettings[voteIndex];
        newSetting.proposal = _proposal;
        newSetting.option1Key = _optionKeys[0];
        newSetting.option2Key = _optionKeys[1];
        newSetting.option3Key = _optionKeys[2];
        newSetting.option1Value = _optionValues[0];
        newSetting.option2Value = _optionValues[1];
        newSetting.option3Value = _optionValues[2];
        newSetting.option1Votes = 0;
        newSetting.option2Votes = 0;
        newSetting.option3Votes = 0;
        newSettings.maxVotes = collection.totalSupply(1);
        voteSettings[voteIndex] = newSetting;
        votingsIndex++;
    }

    function endVote() external onlyRole(AUTHOR_ROLE) {
        require(state.Voting, "No active vote");
        state = State.NotVoting;
    }

    function vote(uint256 _option) external authorized {
        Setting currentSetting = voteSettings[voteIndex];
        require(State.Voting, "No active vote");
        require(
            currentSetting.totalVotesCount <= maxVotes,
            "Max votes reached."
        );
        require(!votings[voteIndex][msg.sender].voted, "Already voted");
        votings[voteIndex][msg.sender] = _option;
        votings[voteIndex][msg.sender].voted = true;
        currentSetting.votesCount++;

        if (_option == 1) {
            currentSetting.option1Votes++;
        } else if (_option == 2) {
            currentSetting.option2Votes++;
        } else {
            currentSetting.option3Votes++;
        }
    }
}
