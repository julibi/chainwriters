//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../interfaces/IMoonpageManager.sol";
import "../interfaces/IAuctionsManager.sol";

// TODO: first id is 0 - either increment in the beginning or transfer the first one to Library
// needs to be ownable? But how make it is deployed by factory ownable when
contract MoonpageCollection is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Pausable,
    AccessControl
{
    using Counters for Counters.Counter;
    bytes32 public constant CREATOR_ROLE = keccak256("CREATOR_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    Counters.Counter private _tokenIdCounter;
    IMoonpageManager public moonpageManager;
    IAuctionsManager public auctionsManager;
    string public baseUri;

    uint256 public lastGenEd;

    event BaseUriSet(string indexed baseUri);
    event Minted(uint256 edition, address account, uint256 tokenId);
    event Paused(address collection, bool paused);
    event NextEditionEnabled(
        uint256 nextEdId,
        uint256 maxSupply,
        uint256 mintPrice
    );
    event URISet(string uri);

    constructor(
        address _caller,
        address _mpAddress,
        address _amAddress,
        uint256 _initialMintPrice,
        uint256 _firstEditionAmount
    ) ERC721("Moonpage", "MP") {
        moonpageManager = IMoonpageManager(_mpAddress);
        auctionsManager = IAuctionsManager(_amAddress);
        _grantRole(PAUSER_ROLE, _caller);
        _grantRole(CREATOR_ROLE, _caller);
        // grant Minter role and only let minter role mint

        lastGenEd = _firstEditionAmount;
    }

    modifier onlyDaoManager() {
        require(msg.sender == address(moonpageManager), "Not authorized");
        _;
    }

    // the first edition is being sold in a reverse auction
    function buy(uint256 _projectId) external payable whenNotPaused {
        (
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            uint256 currentTokenId,
            uint256 endTokenId,

        ) = moonpageManager.readBaseData(_projectId);
        (, , , , , bool auctionsStarted, bool auctionsEnded) = auctionsManager
            .readAuctionSettings(_projectId);
        require(auctionsStarted, "Auctions have not started");
        require(!auctionsEnded, "Auctions ended");
        uint256 price = auctionsManager.getPrice(_projectId, edition.mintPrice);
        bool shouldFinalize = (currentTokenId + 1) == endTokenId;
        require(msg.value >= price, "Value sent not sufficient");

        mint(msg.sender, 1);
        moonpageManager.increaseCurrentTokenId(_pojectId, 1);
        uint256 refund = msg.value - price;
        if (refund > 0) {
            payable(msg.sender).transfer(refund);
        }
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
        uint256 projectEdition = moonpageManager.editionsIndeces[_projectId];
        require(projectEdition > 0, "Public minting possible from edition 2");
        // continue here
        require(
            (totalSupply() + _amount) <= edition.maxAmount,
            "Amount exceeds cap."
        );
        require(
            msg.value >=
                editions[_projectId][projectEdition].mintPrice * _amount,
            "Value sent not sufficient."
        );
        bool shouldFinalize = (totalSupply() + _amount) == edition.maxAmount;
        mint(msg.sender, _amount);
        if (shouldFinalize) {
            moonpageManager.distributeShares();
        }
    }

    // ------------------
    // Functions for Creator
    // ------------------

    function setBaseUri(string memory _baseUri)
        public
        onlyRole(CREATOR_ROLE)
        whenNotPaused
    {
        baseUri = _baseUri;
        emit BaseUriSet(baseUri);
    }

    function startAuctions(
        uint256 _projectId,
        uint256 _amountForCreator,
        string memory _newUri,
        uint256 _discountRate
    ) external onlyRole(CREATOR_ROLE) whenNotPaused {
        require(
            moonpageManager.readBaseData(_projectId).exists,
            "Invalid projectId"
        );
        require(
            _amountForCreator > 0 && _amountForCreator < 4,
            "Invalid amount"
        );
        auctionsManager.startAuctions(
            _projectId,
            _amountForCreator,
            _discountRate
        );
        moonpageManager.setIsBaseDataFrozen(_projectId, _amountForCreator);
        moonpageManager.setPremintedByCreator(_projectId, true);
        mint(msg.sender, _amountForCreator);
        setBaseUri(_newUri);
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

        for (uint256 i = 0; i < _amount; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            if (tokenId <= edition.maxAmount) {
                _safeMint(_receiver, tokenId);
                emit Minted(edition.current, _receiver, tokenId);
            }
        }
    }

    // ------------------
    // Admin functions
    // -----------------

    function setContracts(address _mpManager, address _aManager)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        moonpageManager = IMoonpageManager(_mpManager);
        auctionsManager = IAuctionsManager(_aManager);
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

    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
        emit Paused(address(this), true);
    }

    function unpause() external onlyRole(PAUSER_ROLE) {
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

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
