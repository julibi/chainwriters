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
    uint256 public constant MAX_PER_WALLET = 5;
    Counters.Counter private _tokenIdCounter;
    string public projectName;
    string public projectSymbol;
    IMoonpageManager public moonpageManager;
    IAuctionsManager public auctionsManager;
    string public baseUri;
    uint256 public premintedByCreator = 0;
    // auctionsStarted overlaps but used to not make MoonpageManager import AuctionsManager
    bool public auctionsStarted = false;
    struct Edition {
        uint256 current;
        uint256 maxAmount;
        uint256 mintPrice;
    }
    Edition public edition;
    uint256 public lastGenEd;

    event BaseUriSet(string indexed baseUri);
    event Minted(uint256 edition, address account, uint256 tokenId);
    event Paused(bool paused);
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
        uint256 _firstEditionAmount,
        string memory _title,
        string memory _symbol
    ) ERC721("", "") {
        moonpageManager = IMoonpageManager(_mpAddress);
        auctionsManager = IAuctionsManager(_amAddress);
        _grantRole(PAUSER_ROLE, _caller);
        _grantRole(CREATOR_ROLE, _caller);
        _grantRole(DEFAULT_ADMIN_ROLE, _caller);
        // grand Minter role and only let minter role mint

        edition = Edition(1, _firstEditionAmount, _initialMintPrice);
        lastGenEd = _firstEditionAmount;
        projectName = _title;
        projectSymbol = _symbol;
    }

    modifier onlyDaoManager() {
        require(msg.sender == address(moonpageManager), "Not authorized");
        _;
    }

    // the first edition is being sold in a reverse auction
    function buy() external payable whenNotPaused {
        (
            ,
            ,
            ,
            ,
            uint256 expiresAt,
            bool auctionsStarted,
            bool auctionsEnded
        ) = auctionsManager.readAuctionSettings(address(this));
        require(auctionsStarted, "Auctions have not started");
        require(!auctionsEnded, "Auctions ended");
        require(expiresAt > block.timestamp, "Auction ended, trigger again");
        uint256 price = auctionsManager.getPrice(
            address(this),
            edition.mintPrice
        );
        bool shouldFinalize = (totalSupply() + 1) == edition.maxAmount;
        require(msg.value >= price, "Value sent not sufficient");

        mint(msg.sender, 1);
        uint256 refund = msg.value - price;
        if (refund > 0) {
            payable(msg.sender).transfer(refund);
        }
        if (shouldFinalize) {
            auctionsManager.endAuctions(address(this));
            moonpageManager.distributeShares();
        } else {
            auctionsManager.triggerNextAuction(address(this));
        }
    }

    function publicMint(uint256 _amount) external payable whenNotPaused {
        require(edition.current > 1, "Public minting possible from edition 2");
        require(
            (balanceOf(msg.sender) + _amount) <= MAX_PER_WALLET,
            "Exceeds max per wallet."
        );
        require(
            (totalSupply() + _amount) <= edition.maxAmount,
            "Amount exceeds cap."
        );
        require(
            msg.value >= edition.mintPrice * _amount,
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
        uint256 _amountForCreator,
        string memory _newUri,
        uint256 _discountRate
    ) external onlyRole(CREATOR_ROLE) whenNotPaused {
        auctionsManager.startAuctions(
            address(this),
            _amountForCreator,
            _discountRate
        );
        // require(_amount > 0 && _amount < edition.current, "Invalid amount");
        auctionsStarted = true;
        premintedByCreator = _amountForCreator;
        mint(msg.sender, _amountForCreator);
        setBaseUri(_newUri);
    }

    function enableNextEdition(uint256 _newEdAmount, uint256 _newEdMintPrice)
        external
        onlyRole(CREATOR_ROLE)
        whenNotPaused
    {
        if (edition.current == 1) {
            (, , , , , , bool auctionsEnded) = auctionsManager
                .readAuctionSettings(address(this));
            require(auctionsEnded, "Auctions not finished yet");
        } else {
            // what if some nfts are sent to zero address/burnt? Is there a case that prevents this check from being true?
            require(
                totalSupply() == edition.maxAmount,
                "Current edition has not sold out"
            );
        }
        // require(
        //     _maxNftAmountOfNewEdition < MAX_AMOUNT_EDITION,
        //     "Max Amount too big"
        // );
        edition.current++;
        edition.mintPrice = _newEdMintPrice;
        edition.maxAmount = edition.maxAmount + _newEdAmount;
        emit NextEditionEnabled(
            edition.current,
            edition.maxAmount,
            edition.mintPrice
        );
    }

    // ------------------
    // Internal & Private functions
    // ------------------

    function mint(address _receiver, uint256 _amount) internal {
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
    }

    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
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

    // necessary? I don't want a burning feature
    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
