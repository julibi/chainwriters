//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../interfaces/IMoonpageManager.sol";
import "../interfaces/IAuctionsManager.sol";

// needs to be ownable? But how make it is deployed by factory ownable when
contract MoonpageCollection is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Ownable,
    Pausable
{
    using Counters for Counters.Counter;
    uint256 public maxMintableCreator = 4;
    Counters.Counter private _tokenIdCounter;
    IMoonpageManager public moonpageManager;
    IAuctionsManager public auctionsManager;
    string public baseUri;

    event BaseUriSet(string indexed baseUri);
    event Minted(uint256 edition, address account, uint256 tokenId);
    event Paused(address collection, bool paused);
    event URISet(string uri);

    constructor(address _mpAddress, address _amAddress)
        ERC721("Moonpage", "MP")
    {
        moonpageManager = IMoonpageManager(_mpAddress);
        auctionsManager = IAuctionsManager(_amAddress);
    }

    modifier onlyDaoManager() {
        require(msg.sender == address(moonpageManager), "Not authorized");
        _;
    }

    modifier ifProjectExists(uint256 _projectId) {
        require(moonpageManager.exists(_projectId), "Invalid projectId");
        _;
    }

    modifier onlyProjectCreator(uint256 _projectId) {
        (, , , address creatorAddress, , , , , ) = moonpageManager.readBaseData(
            _projectId
        );
        require(msg.sender == address(creatorAddress), "Not authorized");
        _;
    }

    // the first edition is being sold in a reverse auction
    function buy(uint256 _projectId) external payable whenNotPaused {
        (
            ,
            uint256 initialMintPrice,
            ,
            ,
            uint256 currentTokenId,
            uint256 lastGenEdTokenId,
            ,

        ) = moonpageManager.readEditionData(_projectId);
        (, , , , , bool auctionsStarted, bool auctionsEnded) = auctionsManager
            .readAuctionSettings(_projectId);
        require(auctionsStarted, "Auctions have not started");
        require(!auctionsEnded, "Auctions ended");
        require(
            (currentTokenId + 1) <= lastGenEdTokenId,
            "Amount exceeds cap."
        );
        uint256 price = auctionsManager.getPrice(_projectId, initialMintPrice);
        require(msg.value >= price, "Value sent not sufficient");

        mint(_projectId, msg.sender, 1);
        uint256 refund = msg.value - price;
        if (refund > 0) {
            payable(msg.sender).transfer(refund);
        }
        bool shouldFinalize = (currentTokenId + 1) == lastGenEdTokenId;
        if (shouldFinalize) {
            auctionsManager.endAuctions(_projectId);
            moonpageManager.distributeShares(_projectId);
        } else {
            auctionsManager.triggerNextAuction(_projectId);
        }
    }

    function publicMint(uint256 _projectId, uint256 _amount)
        external
        payable
        whenNotPaused
    {
        (
            uint256 current,
            ,
            uint256 mintPrice,
            ,
            uint256 currentTokenId,
            ,
            uint256 currentEdLastTokenId,

        ) = moonpageManager.readEditionData(_projectId);
        require(current > 1, "Public minting possible from edition 2");
        require(
            (currentTokenId + _amount) <= currentEdLastTokenId,
            "Amount exceeds cap."
        );
        require(
            msg.value >= (mintPrice * _amount),
            "Value sent not sufficient."
        );
        bool shouldFinalize = (currentTokenId + _amount) ==
            currentEdLastTokenId;
        mint(_projectId, msg.sender, _amount);
        if (shouldFinalize) {
            moonpageManager.distributeShares(_projectId);
        }
    }

    // ------------------
    // Functions for Creator
    // ------------------

    function startAuctions(
        uint256 _projectId,
        uint256 _amountForCreator,
        uint256 _discountRate
    )
        external
        whenNotPaused
        ifProjectExists(_projectId)
        onlyProjectCreator(_projectId)
    {
        (, , , , , , , , uint256 premintedByCreator) = moonpageManager
            .readBaseData(_projectId);
        require(
            (premintedByCreator == 0) && !moonpageManager.isFrozen(_projectId),
            "Auctions already started"
        );
        require(
            (_amountForCreator > 0) && (_amountForCreator < maxMintableCreator),
            "Invalid amount for maxMintableCreator"
        );
        auctionsManager.startAuctions(
            _projectId,
            _amountForCreator,
            _discountRate
        );
        moonpageManager.setIsBaseDataFrozen(_projectId, true);
        moonpageManager.setPremintedByCreator(_projectId, _amountForCreator);
        mint(_projectId, msg.sender, _amountForCreator);
    }

    // ------------------
    // Internal & Private functions
    // ------------------

    function mint(
        uint256 _projectId,
        address _receiver,
        uint256 _amount
    ) internal {
        require(_receiver != address(0), "No null address");
        (
            uint256 current,
            ,
            ,
            ,
            uint256 currentTokenId,
            ,
            uint256 currentEdLastTokenId,

        ) = moonpageManager.readEditionData(_projectId);
        for (uint256 i = 0; i < _amount; i++) {
            if (currentTokenId <= currentEdLastTokenId) {
                _safeMint(_receiver, currentTokenId + i);
                emit Minted(current, _receiver, currentTokenId + i);
                moonpageManager.increaseCurrentTokenId(_projectId);
            }
        }
    }

    // ------------------
    // Admin functions
    // -----------------

    function setContracts(address _mpManager, address _aManager)
        external
        onlyOwner
    {
        moonpageManager = IMoonpageManager(_mpManager);
        auctionsManager = IAuctionsManager(_aManager);
    }

    function setMaxMintableCreator(uint256 _maxAmount) external onlyOwner {
        maxMintableCreator = _maxAmount;
    }

    // ------------------
    // Dao Manager functions
    // ------------------

    function withdraw(address _to, uint256 _amount) external onlyDaoManager {
        require(_to != address(0), "Cannot withdraw to the 0 address");
        payable(_to).transfer(_amount);
    }

    // ------------------
    // Explicit overrides
    // ------------------

    function pause() external onlyOwner {
        _pause();
        emit Paused(address(this), true);
    }

    function unpause() external onlyOwner {
        _unpause();
        emit Paused(address(this), false);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseUri;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        // TODO
        // tokenId <= lastGenEd ? genEdMetadata : rest;
        return baseUri;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
