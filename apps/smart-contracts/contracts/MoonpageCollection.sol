//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";
import "../interfaces/IProjectDao.sol";

contract MoonpageCollection is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Pausable,
    AccessControl,
    EIP712,
    ERC721Votes
{
    bytes32 public constant AUTHOR_ROLE = keccak256("AUTHOR_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    uint256 public constant MAX_PER_WALLET = 5;

    uint256 public totalSharePercentage = 15;
    address public factory;
    IProjectDao public daoManager;
    string public baseUri;
    uint256 public premintedByAuthor = 0;

    uint256 public AUCTION_DURATION = 1 days;
    uint256 public discountRate;
    uint256 public startAt;
    uint256 public expiresAt;
    bool public auctionsStarted = false;
    bool public auctionPhaseFinished = false;

    event BaseUriSet(string indexed baseUri);
    event AuctionsStarted();
    event AuctionsEnded();
    event AuthorMinted(uint256 amount);
    event Minted(uint256 edition, uint256 amount);
    event ExpirationSet(uint256 edition, uint256 expirationTime);
    event URISet(string uri);
    event Paused(bool paused);

    constructor(
        string memory _title,
        address _caller,
        address _factory,
        address _daoManager
    ) ERC721(_title, "MP") EIP712("Moonpage", "1") {
        factory = _factory;
        daoManager = IProjectDao(_daoManager);
        _grantRole(PAUSER_ROLE, _factory);
        _grantRole(PAUSER_ROLE, _caller);
        _grantRole(AUTHOR_ROLE, _caller);
        _grantRole(DEFAULT_ADMIN_ROLE, _caller);
        // grand Minter role and only let minter role mint
    }

    modifier onlyDaoManager() {
        require(msg.sender == address(daoManager), "Not authorized");
        _;
    }

    function setBaseUri(string memory _baseUri)
        public
        onlyRole(AUTHOR_ROLE)
        whenNotPaused
    {
        baseUri = _baseUri;
        emit BaseUriSet(baseUri);
    }

    function triggerFirstAuction(
        uint256 _amount,
        string memory _newUri,
        uint256 _discountRate
    ) external onlyRole(AUTHOR_ROLE) whenNotPaused {
        require(!auctionsStarted, "Auctions already started");
        require(premintedByAuthor == 0, "Already claimed");
        (
            uint256 currentEd,
            uint256 currentEdMax,
            uint256 currentEdMintPrice
        ) = daoManager.readEdition(address(this));
        require(_amount > 0 && _amount < currentEdMax, "Invalid amount");
        setBaseUri(_newUri);
        _safeMint(msg.sender, _amount, "");
        premintedByAuthor = _amount;
        discountRate = _discountRate;
        startAt = block.timestamp;
        expiresAt = block.timestamp + AUCTION_DURATION;
        auctionsStarted = true;
        emit AuctionsStarted();
        emit ExpirationSet(1, expiresAt);
    }

    function retriggerAuction() external {
        require(
            expiresAt < block.timestamp,
            "Triggering unnecessary. Auction running."
        );
        startAt = block.timestamp;
        expiresAt = block.timestamp + AUCTION_DURATION;
        emit ExpirationSet(1, expiresAt);
    }

    function buy() external payable whenNotPaused {
        require(auctionsStarted, "Auctions have not started");
        require(!auctionPhaseFinished, "Auctions finished");
        require(expiresAt > block.timestamp, "Auction ended, trigger again");
        (
            uint256 currentEdition,
            uint256 currentEditionMax,
            uint256 currentEditionMintPrice
        ) = daoManager.readEddtion(address(this));
        uint256 price = getPrice(currentEditionMintPrice);
        bool shouldFinalize = (totalSupply() + 1) == currentEditionMax;
        require(msg.value >= price, "Value sent not sufficient");

        _safeMint(msg.sender, 1, "");
        // uint refund = msg.value - price;
        // if (refund > 0) {
        //     payable(msg.sender).transfer(refund);
        // }
        emit Minted(currentEdition, 1);
        if (shouldFinalize) {
            auctionPhaseFinished = true;
            daoManager.distributeShares();
            emit AuctionsEnded();
        } else {
            triggerNextAuction();
        }
    }

    function mint(uint256 _amount) external payable whenNotPaused {
        (
            uint256 currentEdition,
            uint256 currentEditionMax,
            uint256 currentEditionMintPrice
        ) = daoManager.readEdition(address(this));
        require(currentEdition > 1, "Public minting possible from edition 2");
        require(
            (balanceOf(msg.sender) + _amount) <= MAX_PER_WALLET,
            "Exceeds max per wallet."
        );
        require(
            (totalSupply() + _amount) <= currentEditionMax,
            "Amount exceeds cap."
        );
        require(
            msg.value >= currentEditionMintPrice * _amount,
            "Value sent not sufficient."
        );
        bool shouldFinalize = (totalSupply() + 1) == currentEditionMax;
        _safeMint(msg.sender, _amount, "");
        emit Minted(currentEdition, _amount);
        if (shouldFinalize) {
            daoManager.distributeShares();
        }
    }

    // ------------------
    // Private functions
    // ------------------

    function triggerNextAuction() private {
        startAt = block.timestamp;
        expiresAt = block.timestamp + AUCTION_DURATION;
        emit ExpirationSet(1, expiresAt);
    }

    // test from private to internal
    function withdraw(address _to, uint256 _amount) external onlyDaoManager {
        require(_to != address(0), "Cannot withdraw to the 0 address");
        payable(_to).transfer(_amount);
    }

    // ------------------
    // View functions
    // -----------------

    function getPrice(uint256 _startPrice) public view returns (uint256) {
        if (auctionsStarted && !auctionPhaseFinished) {
            uint256 timeElapsed = block.timestamp - startAt;
            uint256 discount = discountRate * timeElapsed;
            return _startPrice - discount;
        }
        return 0;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return baseUri;
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

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
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

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Votes) {
        super._afterTokenTransfer(from, to, tokenId);
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
