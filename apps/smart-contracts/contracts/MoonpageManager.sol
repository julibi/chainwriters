//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../interfaces/IMoonpageCollection.sol";

contract MoonpageManager is AccessControlEnumerable, Pausable {
    using SafeMath for uint256;
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    uint256 public maxAmountEdition = 1000;
    uint256 public minPrice = 1 ether;
    uint256 public projectsLength = 0;
    address public factory;
    uint256 public fee = 15;
    IMoonpageCollection public collection;

    // should deploy a little seperate contract per project, where the payment is being sent and
    // where everything is being split
    // TODO: determine first id of this collection, and last id of gen ed and in general last id
    struct BaseData {
        string title;
        string subtitle;
        string genre;
        address creatorAddress;
        string textIpfsHash;
        string imgIpfsHash;
        string blurbIpfsHash;
        string originalLanguage;
        uint256 premintedByCreator;
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
    struct Edition {
        uint256 current;
        uint256 initialMintPrice;
        uint256 mintPrice;
        uint256 startTokenId;
        uint256 currentTokenId;
        uint256 lastGenEdTokenId; // id of last token in Genesis Edition of a collection
        uint256 currentEdLastTokenId; // id of last token in current edition
        uint256 endTokenId;
    }
    mapping(uint256 => BaseData) public baseDatas;
    mapping(uint256 => AuthorShare) public authorShares;
    mapping(uint256 => Edition) public editions;
    mapping(uint256 => mapping(uint256 => Contribution)) public contributions;
    mapping(uint256 => uint8) public contributionsIndeces;
    mapping(uint256 => bool) public existingProjectIds;
    mapping(uint256 => bool) public curatedProjectIds;
    mapping(uint256 => bool) public frozenProjectIds;
    mapping(uint256 => bool) public pausedProjectIds;

    event Configured(
        uint256 projectId,
        string imgHash,
        string blurbHash,
        string newGenre,
        string newSubtitle
    );
    event TextSet(uint256 projectId, string textHash);
    event ContributorAdded(address contributor, uint256 share, string role);
    event Curated(uint256 project, bool isCurated);
    event NextEditionEnabled(
        uint256 editionId,
        uint256 maxSupply,
        uint256 mintPrice
    );

    constructor(address _collection) {
        _setupRole(PAUSER_ROLE, msg.sender);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        collection = IMoonpageCollection(_collection);
    }

    modifier onlyCreator(uint256 _projectId) {
        require(
            msg.sender == baseDatas[_projectId].creatorAddress,
            "Not author"
        );
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == address(factory), "Not authorized");
        _;
    }

    modifier onlyCollection() {
        require(msg.sender == address(collection), "Not authorized");
        _;
    }

    // ------------------
    // Write functions for authors
    // ------------------

    // TODO: test if dao has already been created (if textcidhash is the same)
    function setupDao(
        address _caller,
        uint256 _projectId,
        string calldata _title,
        string calldata _textCID,
        string calldata _originalLanguage,
        uint256 _initialMintPrice,
        uint256 _firstEditionAmount
    ) external onlyFactory whenNotPaused {
        baseDatas[_projectId].title = _title;
        baseDatas[_projectId].subtitle = "";
        baseDatas[_projectId].genre = "";
        baseDatas[_projectId].creatorAddress = address(_caller);
        baseDatas[_projectId].textIpfsHash = _textCID;
        baseDatas[_projectId].imgIpfsHash = "";
        baseDatas[_projectId].blurbIpfsHash = "";
        baseDatas[_projectId].originalLanguage = _originalLanguage;
        baseDatas[_projectId].premintedByCreator = 0;
        authorShares[_projectId].share = 100 - fee;
        authorShares[_projectId].shareInMatic = 0;
        uint256 startId = _projectId * maxAmountEdition;
        editions[_projectId].current = 1;
        editions[_projectId].initialMintPrice = _initialMintPrice;
        editions[_projectId].mintPrice = _initialMintPrice;
        editions[_projectId].startTokenId = startId;
        editions[_projectId].currentTokenId = startId;
        editions[_projectId].currentEdLastTokenId =
            startId +
            _firstEditionAmount;
        editions[_projectId].lastGenEdTokenId = startId + _firstEditionAmount;
        editions[_projectId].endTokenId = startId + maxAmountEdition;
        contributionsIndeces[_projectId] = 0;
        existingProjectIds[_projectId] = true;
        curatedProjectIds[_projectId] = false;
        frozenProjectIds[_projectId] = false;
        pausedProjectIds[_projectId] = false;
        projectsLength++;
    }

    function configureProjectDetails(
        uint256 _projectId,
        string calldata _imgHash,
        string calldata _blurbHash,
        string calldata _genre,
        string calldata _subtitle
    ) external onlyCreator(_projectId) whenNotPaused {
        require(!frozenProjectIds[_projectId], "Base data frozen");
        baseDatas[_projectId].imgIpfsHash = _imgHash;
        baseDatas[_projectId].blurbIpfsHash = _blurbHash;
        baseDatas[_projectId].genre = _genre;
        baseDatas[_projectId].subtitle = _subtitle;

        emit Configured(_projectId, _imgHash, _blurbHash, _genre, _subtitle);
    }

    function setTextIpfsHash(uint256 _projectId, string calldata _ipfsHash)
        external
        onlyCreator(_projectId)
        whenNotPaused
    {
        require(!frozenProjectIds[_projectId], "Base data frozen");
        baseDatas[_projectId].textIpfsHash = _ipfsHash;

        emit TextSet(_projectId, _ipfsHash);
    }

    function addContributors(
        uint256 _projectId,
        address[] calldata _contributors,
        uint256[] calldata _shares,
        string[] calldata _roles
    ) external onlyCreator(_projectId) whenNotPaused {
        // in theory user can put the same contributor 3 times - we don't care

        AuthorShare storage share = authorShares[_projectId];
        require(!frozenProjectIds[_projectId], "Base data frozen");
        require(
            contributionsIndeces[_projectId] == 0,
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
            contributions[_projectId][i].shareRecipient = _contributors[i];
            contributions[_projectId][i].share = _shares[i];
            contributions[_projectId][i].role = _roles[i];
            contributionsIndeces[_projectId]++;
            share.share = share.share - _shares[i];
            emit ContributorAdded(_contributors[i], _shares[i], _roles[i]);
        }
    }

    function enableNextEdition(
        uint256 _projectId,
        uint256 _newEdAmount,
        uint256 _newEdMintPrice
    ) external onlyCreator(_projectId) whenNotPaused {
        require(
            editions[_projectId].currentTokenId + _newEdAmount <=
                editions[_projectId].endTokenId,
            "Exceeds possible amount"
        );
        require(_newEdMintPrice >= minPrice, "Price too low");
        require(
            editions[_projectId].currentTokenId ==
                editions[_projectId].currentEdLastTokenId,
            "Current edition has not sold out"
        );

        editions[_projectId].current++;
        editions[_projectId].mintPrice = _newEdMintPrice;
        editions[_projectId].startTokenId =
            editions[_projectId].currentTokenId +
            1;
        editions[_projectId].currentEdLastTokenId =
            editions[_projectId].currentTokenId +
            _newEdAmount +
            1;

        emit NextEditionEnabled(
            editions[_projectId].current,
            _newEdAmount,
            _newEdMintPrice
        );
    }

    // ------------------
    // Read functions
    // ------------------

    function isFrozen(uint256 _projectId) external view returns (bool) {
        return frozenProjectIds[_projectId];
    }

    function exists(uint256 _projectId) external view returns (bool) {
        return existingProjectIds[_projectId];
    }

    function readBaseData(uint256 _projectId)
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
            string memory,
            uint256
        )
    {
        BaseData storage data = baseDatas[_projectId];
        return (
            data.title,
            data.subtitle,
            data.genre,
            data.creatorAddress,
            data.textIpfsHash,
            data.imgIpfsHash,
            data.blurbIpfsHash,
            data.originalLanguage,
            data.premintedByCreator
        );
    }

    function readAuthorShare(uint256 _projectId)
        external
        view
        returns (uint256, uint256)
    {
        AuthorShare storage aShare = authorShares[_projectId];
        return (aShare.share, aShare.shareInMatic);
    }

    function readEditionData(uint256 _projectId)
        external
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        Edition storage data = editions[_projectId];

        return (
            data.current,
            data.initialMintPrice,
            data.mintPrice,
            data.startTokenId,
            data.currentTokenId,
            data.lastGenEdTokenId,
            data.currentEdLastTokenId,
            data.endTokenId
        );
    }

    function readContribution(uint256 _projectId, uint256 _index)
        external
        view
        returns (
            address,
            string memory,
            uint256,
            uint256
        )
    {
        Contribution storage contrib = contributions[_projectId][_index];
        return (
            contrib.shareRecipient,
            contrib.role,
            contrib.share,
            contrib.shareInMatic
        );
    }

    function readContributionIndex(uint256 _projectId)
        external
        view
        returns (uint256)
    {
        return contributionsIndeces[_projectId];
    }

    // ------------------
    // Can only be called by a Collection
    // ------------------

    function increaseCurrentTokenId(uint256 _projectId)
        external
        onlyCollection
    {
        editions[_projectId].currentTokenId = editions[_projectId]
            .currentTokenId
            .add(1);
    }

    function setIsBaseDataFrozen(uint256 _projectId, bool _shouldBeFrozen)
        external
        onlyCollection
    {
        frozenProjectIds[_projectId] = _shouldBeFrozen;
    }

    function setPremintedByCreator(
        uint256 _projectId,
        uint8 _premintedByCreator
    ) external onlyCollection {
        baseDatas[_projectId].premintedByCreator = _premintedByCreator;
    }

    // who can call this?
    function distributeShares(uint256 _projectId) external {
        BaseData storage baseData = baseDatas[_projectId];
        address authorAddress = baseData.creatorAddress;
        // IS THIS SAFE?
        require(address(authorAddress) != address(0), "Not authorized");

        // TODO make it work!
        // uint256 leftShares = 100 - fee;
        // uint256 balanceTotal = address(collectionAddr).balance;
        // uint256 foundationShareInMatic = (balanceTotal * fee) / 100;
        // uint256 contribIndex = contributionsIndeces[collectionAddr];
        // AuthorShare storage authorShare = authorShares[collectionAddr];
        // IMoonpageCollection collection = IMoonpageCollection(collectionAddr);
        // if (contribIndex == 0) {
        //     authorShare.share = leftShares;
        //     authorShare.shareInMatic = (balanceTotal * leftShares) / 100;
        // }
        // for (uint256 i = 0; i < contribIndex; i++) {
        //     Contribution storage contrib = contributions[_projectId][i];
        //     leftShares = leftShares - contrib.share;
        //     contrib.shareInMatic = (balanceTotal * contrib.share) / 100;
        //     if (i == (contribIndex - 1)) {
        //         authorShare.share = leftShares;
        //         authorShare.shareInMatic = (balanceTotal * leftShares) / 100;
        //     }
        //     collection.withdraw(contrib.shareRecipient, contrib.shareInMatic);
        // }

        // collection.withdraw(authorAddress, authorShare.shareInMatic);
        // collection.withdraw(factory, foundationShareInMatic);
    }

    // ------------------
    // Admin Functions
    // ------------------

    function setIsCurated(uint256 _projectId)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(existingProjectIds[_projectId], "Does not exist");
        curatedProjectIds[_projectId] = true;
        emit Curated(_projectId, true);
    }

    function setFactory(address _factory)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        factory = address(_factory);
    }

    function setCollection(address _collection)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        collection = IMoonpageCollection(_collection);
    }

    function setMaxAmountEdition(uint256 _newMaxAmount)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        maxAmountEdition = _newMaxAmount;
    }

    function setMinPrice(uint256 _minPrice)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        minPrice = _minPrice;
    }

    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(PAUSER_ROLE) {
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
