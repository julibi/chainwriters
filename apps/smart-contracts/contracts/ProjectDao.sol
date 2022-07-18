//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "../interfaces/IProjectCollection.sol";

contract ProjectDao is AccessControlEnumerable, Pausable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    uint256 public constant MAX_AMOUNT_EDITION = 10000;
    uint256 public projectsLength = 0;
    address public factory;
    uint256 public fee = 15;

    struct BaseData {
        string title;
        string subtitle;
        string genre;
        address author_address;
        string textIpfsHash;
        string imgIpfsHash;
        string blurbIpfsHash;
        bool paused;
    }
    struct Edition {
        uint256 currentEdition;
        uint256 currentEditionMax;
        uint256 currentEditionMintPrice;
    }
    struct AuthorShare {
        uint256 share;
        uint256 shareInMatic;
    }
    struct Contribution {
        address shareRecipient;
        string role;
        uint256 share;
        uint256 shareInMatic;
    }

    mapping(address => BaseData) public baseDatas;
    mapping(address => Edition) public editions;
    mapping(address => AuthorShare) public authorShares;
    mapping(address => mapping(uint256 => Contribution)) public contributions;
    mapping(address => uint8) public contributionsIndeces;

    event Configured(
        string imgHash,
        string blurbHash,
        string newGenre,
        string newSubtitle
    );
    event TextSet(string textHash);
    event ContributorAdded(address contributor, uint256 share, string role);
    event Paused(bool paused);
    event NextEditionEnabled(
        uint256 nextEdId,
        uint256 maxSupply,
        uint256 mintPrice
    );

    constructor() {
        _setupRole(PAUSER_ROLE, msg.sender);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    modifier onlyAuthor(address _collection) {
        require(
            msg.sender == baseDatas[_collection].author_address,
            "Not author"
        );
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == address(factory), "Not authorized");
        _;
    }

    // ------------------
    // Write functions for authors
    // ------------------

    // TODO: test if dao has already been created (if textcidhash is the same)
    function setupDao(
        address _caller,
        address _collection,
        string calldata _title,
        string calldata _textCID,
        uint256 _startPrice,
        uint256 _maxAmount
    ) external onlyFactory {
        Edition memory newEdition = Edition(1, _maxAmount, _startPrice);
        BaseData memory newBaseData = BaseData(
            _title,
            "",
            "",
            address(_caller),
            _textCID,
            "",
            "",
            false
        );
        AuthorShare memory newAuthorShare = AuthorShare(100 - fee, 0);
        projectsLength++;
        editions[_collection] = newEdition;
        baseDatas[_collection] = newBaseData;
        authorShares[_collection] = newAuthorShare;
        contributionsIndeces[_collection] = 0;
    }

    function configureProjectDetails(
        address _collection,
        string calldata _imgHash,
        string calldata _blurbHash,
        string calldata _genre,
        string calldata _subtitle
    ) external onlyAuthor(_collection) whenNotPaused {
        IProjectCollection collection = IProjectCollection(_collection);
        require(!collection.auctionsStarted(), "Auctions started already");
        baseDatas[_collection].imgIpfsHash = _imgHash;
        baseDatas[_collection].blurbIpfsHash = _blurbHash;
        baseDatas[_collection].genre = _genre;
        baseDatas[_collection].subtitle = _subtitle;

        emit Configured(_imgHash, _blurbHash, _genre, _subtitle);
    }

    function setTextIpfsHash(address _collection, string calldata _ipfsHash)
        external
        onlyAuthor(_collection)
        whenNotPaused
    {
        IProjectCollection collection = IProjectCollection(_collection);
        require(!collection.auctionsStarted(), "Auctions started already");
        baseDatas[_collection].textIpfsHash = _ipfsHash;

        emit TextSet(_ipfsHash);
    }

    function addContributors(
        address _collection,
        address[] calldata _contributors,
        uint256[] calldata _shares,
        string[] calldata _roles
    ) external onlyAuthor(_collection) whenNotPaused {
        // in theory user can put the same contributor 3 times - we don't care
        IProjectCollection collection = IProjectCollection(_collection);
        AuthorShare storage share = authorShares[_collection];
        require(!collection.auctionsStarted(), "Auctions started already");
        require(
            contributionsIndeces[_collection] == 0,
            "Contributors set already"
        );
        require(_contributors.length <= 3, "Max 3 contributors");
        require(
            (_contributors.length == _shares.length) &&
                (_contributors.length == _roles.length),
            "Same length required"
        );
        uint256 contribTotalShares = 0;
        for (uint8 i = 0; i < _contributors.length; i++) {
            contribTotalShares += _shares[i];
        }
        require(contribTotalShares <= 85, "Contributor shares too high");

        for (uint8 i = 0; i < _contributors.length; i++) {
            require(
                _contributors[i] != address(0),
                "Contributor cannot be 0 address"
            );
            contributions[_collection][i].shareRecipient = _contributors[i];
            contributions[_collection][i].share = _shares[i];
            contributions[_collection][i].role = _roles[i];
            contributionsIndeces[_collection]++;
            share.share = share.share - _shares[i];
            emit ContributorAdded(_contributors[i], _shares[i], _roles[i]);
        }
    }

    function enableNextEdition(
        address _collection,
        uint256 _maxNftAmountOfNewEdition,
        uint256 _newEditionMintPrice
    ) external onlyAuthor(_collection) whenNotPaused {
        Edition storage edition = editions[_collection];
        IProjectCollection collection = IProjectCollection(_collection);
        if (edition.currentEdition == 1) {
            require(
                collection.auctionPhaseFinished(),
                "Auctions not finished yet"
            );
        } else {
            // what if some nfts are sent to zero address? Is there a case that prevents this check from being true?
            require(
                collection.totalSupply(edition.currentEdition) ==
                    edition.currentEditionMax,
                "Current edition has not sold out"
            );
        }
        require(
            _maxNftAmountOfNewEdition < MAX_AMOUNT_EDITION,
            "Max Amount too big"
        );
        edition.currentEdition++;
        edition.currentEditionMax = _maxNftAmountOfNewEdition;
        edition.currentEditionMintPrice = _newEditionMintPrice;
        emit NextEditionEnabled(
            edition.currentEdition,
            _maxNftAmountOfNewEdition,
            _newEditionMintPrice
        );
    }

    // ------------------
    // Read functions
    // ------------------

    function readBaseData(address _collection)
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            address,
            string memory,
            string memory,
            string memory,
            bool
        )
    {
        BaseData storage data = baseDatas[_collection];
        return (
            data.title,
            data.subtitle,
            data.genre,
            data.author_address,
            data.textIpfsHash,
            data.imgIpfsHash,
            data.blurbIpfsHash,
            data.paused
        );
    }

    function readEdition(address _collection)
        external
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        Edition storage ed = editions[_collection];
        return (
            ed.currentEdition,
            ed.currentEditionMax,
            ed.currentEditionMintPrice
        );
    }

    function readAuthorShare(address _collection)
        external
        view
        returns (uint256, uint256)
    {
        AuthorShare storage aShare = authorShares[_collection];
        return (aShare.share, aShare.shareInMatic);
    }

    function readContribution(address _collection, uint256 _index)
        external
        view
        returns (
            address,
            string memory,
            uint256,
            uint256
        )
    {
        Contribution storage contrib = contributions[_collection][_index];
        return (
            contrib.shareRecipient,
            contrib.role,
            contrib.share,
            contrib.shareInMatic
        );
    }

    function readContributionIndex(address _collection)
        external
        view
        returns (uint256)
    {
        return contributionsIndeces[_collection];
    }

    // ------------------
    // Can only be called by a Collection
    // ------------------

    // TODO - second pay is not being distributed
    // TODO - author is not receiving share

    function distributeShares() external {
        address collectionAddr = address(msg.sender);
        BaseData storage baseData = baseDatas[collectionAddr];
        address author_address = baseData.author_address;
        // IS THIS SAFE?
        require(address(author_address) != address(0), "Not authorized");

        uint256 leftShares = 85;
        uint256 balanceTotal = address(collectionAddr).balance;
        uint256 foundationShareInMatic = (balanceTotal * 15) / 100;
        uint256 contribIndex = contributionsIndeces[collectionAddr];
        AuthorShare storage authorShare = authorShares[collectionAddr];
        IProjectCollection collection = IProjectCollection(collectionAddr);
        if (contribIndex == 0) {
            authorShare.share = leftShares;
            authorShare.shareInMatic = (balanceTotal * leftShares) / 100;
        }
        for (uint256 i = 0; i < contribIndex; i++) {
            Contribution storage contrib = contributions[collectionAddr][i];
            leftShares = leftShares - contrib.share;
            contrib.shareInMatic = (balanceTotal * contrib.share) / 100;
            if (i == (contribIndex - 1)) {
                authorShare.share = leftShares;
                authorShare.shareInMatic = (balanceTotal * leftShares) / 100;
            }
            collection.withdraw(contrib.shareRecipient, contrib.shareInMatic);
        }

        collection.withdraw(author_address, authorShare.shareInMatic);
        collection.withdraw(factory, foundationShareInMatic);
    }

    // ------------------
    // Explicit overrides
    // ------------------

    // ------------------
    // Can only be called by Foundation
    // ------------------

    function setFactory(address _factory)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        factory = address(_factory);
    }

    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
        emit Paused(true);
    }

    function unpause() external onlyRole(PAUSER_ROLE) {
        emit Paused(false);
        _unpause();
    }

    // ------------------
    // Explicit overrides
    // ------------------

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControlEnumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
