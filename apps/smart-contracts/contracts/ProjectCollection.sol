//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "../interfaces/IProjectDao.sol";

// TODO: make the collection read from the dao
// make collection verified, always

contract ProjectCollection is
    ERC1155,
    AccessControlEnumerable,
    ERC1155Supply,
    Pausable
{
    bytes32 public constant AUTHOR_ROLE = keccak256("AUTHOR_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    uint256 public constant MAX_PER_WALLET = 5;

    uint256 public totalSharePercentage = 15;
    address public factory;
    IProjectDao public daoManager;
    string public name;
    uint256 public premintedByAuthor = 0;

    uint256 public AUCTION_DURATION = 1 days;
    uint256 public discountRate;
    uint256 public startAt;
    uint256 public expiresAt;
    bool public auctionsStarted = false;
    bool public auctionPhaseFinished = false;

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
    ) ERC1155("") {
        name = _title;
        factory = _factory;
        daoManager = IProjectDao(_daoManager);
        _setupRole(PAUSER_ROLE, _factory);
        _setupRole(PAUSER_ROLE, _caller);
        _setupRole(AUTHOR_ROLE, _caller);
    }

    modifier onlyFactory() {
        require(msg.sender == address(factory), "Not authorized");
        _;
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
        _setURI(_newUri);
        _mint(msg.sender, 1, _amount, "");
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
        ) = daoManager.readEdition(address(this));
        uint256 price = getPrice(currentEditionMintPrice);
        bool shouldFinalize = (totalSupply(1) + 1) == currentEditionMax;
        require(msg.value >= price, "Value sent not sufficient");

        _mint(msg.sender, 1, 1, "");
        // uint refund = msg.value - price;
        // if (refund > 0) {
        //     payable(msg.sender).transfer(refund);
        // }
        emit Minted(currentEdition, 1);
        if (shouldFinalize) {
            auctionPhaseFinished = true;
            // something seems to go wrong here
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
            (balanceOf(msg.sender, currentEdition) + _amount) <= MAX_PER_WALLET,
            "Exceeds max per wallet."
        );
        require(
            (totalSupply(currentEdition) + _amount) <= currentEditionMax,
            "Amount exceeds cap."
        );
        require(
            msg.value >= currentEditionMintPrice * _amount,
            "Value sent not sufficient."
        );
        _mint(msg.sender, currentEdition, _amount, "");
        emit Minted(currentEdition, _amount);
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
    function withdraw(address _to, uint256 _amount) external {
        require(msg.sender == address(factory), "Not authorized");
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

    // ------------------
    // Explicit overrides
    // ------------------

    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControlEnumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
