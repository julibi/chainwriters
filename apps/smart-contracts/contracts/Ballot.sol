//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "../interfaces/IMoonpageCollection.sol";
import "../interfaces/IMoonpageManager.sol";

contract Ballot is AccessControlEnumerable, Pausable {
    bytes32 public constant AUTHOR_ROLE = keccak256("AUTHOR_ROLE");
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
        uint256 votesCount;
    }

    mapping(uint256 => mapping(uint256 => SingleVote)) internal votings;
    mapping(uint256 => Setting) public voteSettings;
    uint256 public maxVotes;
    uint256 public votingsIndex = 0;

    constructor(address _collection, address _creator) {
        _setupRole(PAUSER_ROLE, _creator);
        _setupRole(AUTHOR_ROLE, _creator);
        collection = IMoonpageCollection(_collection);
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
        uint8[] memory _optionKeys,
        string[] memory _optionValues
    ) external onlyRole(AUTHOR_ROLE) inState(State.NotVoting) {
        require(_optionKeys.length == 3, "Must be three options");
        require(
            _optionKeys.length == _optionValues.length,
            "Key and vale must be same length"
        );

        Setting storage newSetting = voteSettings[votingsIndex];
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
        voteSettings[votingsIndex] = newSetting;
        votingsIndex++;
    }

    function endVote() external onlyRole(AUTHOR_ROLE) inState(State.Voting) {
        state = State.NotVoting;
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
        Setting storage currentSetting = voteSettings[votingsIndex];
        require(currentSetting.votesCount + 1 <= maxId, "Max votes reached");
        votings[votingsIndex][_tokenId] = _option;
        votings[votingsIndex][_tokenId].voted = true;
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
