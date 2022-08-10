//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

// Make it pausable!
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "../interfaces/IMoonpageManager.sol";
import "../interfaces/IAuctionsManager.sol";
import "./MoonpageCollection.sol";

contract MoonpageFactory is Ownable, Pausable {
    uint256 public firstEditionMin = 5;
    uint256 public firstEditionMax = 1000;
    IMoonpageManager public moonpageManager;
    IAuctionsManager public auctionsManager;
    uint256 public projectsIndex = 1;
    event ProjectCreated(
        address owner,
        uint256 projectId,
        string title,
        string textIpfsHash,
        string originalLanguage,
        uint256 initialMintPrice,
        uint256 firstEditionAmount
    );

    constructor(address _mpManager, address _auctionsManager) {
        moonpageManager = IMoonpageManager(_mpManager);
        auctionsManager = IAuctionsManager(_auctionsManager);
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
        auctionsManager.setupAuctionSettings(projectsIndex);
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
        onlyOwner
        whenNotPaused
    {
        moonpageManager = IMoonpageManager(_mpManager);
        auctionsManager = IAuctionsManager(_aManager);
    }

    function setGenesisAmountRange(uint256 _min, uint256 _max)
        external
        onlyOwner
        whenNotPaused
    {
        firstEditionMin = _min;
        firstEditionMax = _max;
    }

    function withdraw(address _to) external payable onlyOwner whenNotPaused {
        require(_to != address(0), "Cannot withdraw to the 0 address");
        payable(_to).transfer(address(this).balance);
    }

    receive() external payable {}

    // ------------------
    // Admin Functions
    // ------------------

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
