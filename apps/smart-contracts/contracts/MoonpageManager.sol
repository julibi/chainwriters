//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "../interfaces/IMoonpageCollection.sol";

contract MoonpageManager is AccessControlEnumerable, Pausable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    uint256 public constant MAX_AMOUNT_EDITION = 10000;
    uint256 public projectsLength = 0;
    address public factory;
    uint256 public fee = 15;

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
        uint256 currentEdition;
        uint256 premintedByCreator;
        bool exists;
        bool isCurated;
        bool isBaseDataFrozen;
        bool paused;

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
        uint256 maxAmount;
        uint256 mintPrice;
    }

    mapping(uint256 => BaseData) public baseDatas;
    mapping(uint256 => Edition) public editions;
    mapping(uint256 => AuthorShare) public authorShares;
    mapping(uint256 => mapping(uint256 => Contribution)) public contributions;
    mapping(uint256 => uint8) public contributionsIndeces;

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

    constructor() {
        _setupRole(PAUSER_ROLE, msg.sender);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
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

    // ------------------
    // Write functions for authors
    // ------------------

    // TODO: test if dao has already been created (if textcidhash is the same)
    function setupDao(
        address _caller,
        uint256 _projectId,
        string calldata _title,
        string calldata _textCID
    ) external onlyFactory whenNotPaused {
        BaseData memory newBaseData = BaseData(
            _title,
            "",
            "",
            address(_caller),
            _textCID,
            "",
            "",
            1,
            0,
            true,
            false,
            false,
            false
        );

        AuthorShare memory newAuthorShare = AuthorShare(100 - fee, 0);
        baseDatas[_projectId] = newBaseData;
        authorShares[_projectId] = newAuthorShare;
        contributionsIndeces[_projectId] = 0;
        projectsLength++;
    }

    function configureProjectDetails(
        uint256 _projectId,
        string calldata _imgHash,
        string calldata _blurbHash,
        string calldata _genre,
        string calldata _subtitle
    ) external onlyCreator(_projectId) whenNotPaused {
        
        require(
            !baseDatas[_projectId].isBaseDataFrozen,
            "Base data frozen"
        );
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
        require(
            !baseDatas[_projectId].isBaseDataFrozen,
            "Base data frozen"
        );
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
        require(
            !baseDatas[_projectId].isBaseDataFrozen,
            "Base data frozen"
        );
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

    function enableNextEdition(uint256 _projectId, uint256 _newEdAmount, uint256 _newEdMintPrice)
        external
        onlyCreator(_projectId)
        whenNotPaused
    {
        // TODO
        // if (editions[_projectId].current == 1) {
        //     (, , , , , , bool auctionsEnded) = auctionsManager
        //         .readAuctionSettings(_projectId);
        //     require(auctionsEnded, "Auctions not finished yet");
        // } else {
        //     require(
        //         totalSupply() == edition.maxAmount,
        //         "Current edition has not sold out"
        //     );
        // }
        // edition.current++;
        // edition.mintPrice = _newEdMintPrice;
        // edition.maxAmount = edition.maxAmount + _newEdAmount;
        // emit NextEditionEnabled(
        //     edition.current,
        //     edition.maxAmount,
        //     edition.mintPrice
        // );
    }

    // ------------------
    // Read functions
    // ------------------

    function readBaseData(uint _projectId)
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
        BaseData storage data = baseDatas[_projectId];
        return (
            data.title,
            data.subtitle,
            data.genre,
            data.creatorAddress,
            data.textIpfsHash,
            data.imgIpfsHash,
            data.blurbIpfsHash,
            data.paused
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
    
    function setIsCurated(uint256 _projectId) external onlyRole(DEFAULT_ADMIN_ROLE) {
      require(baseDatas[_projectId].exists, "Does not exist");
      baseDatas[_projectId].isCurated = true;
      emit Curated(_projectId, true);
    }

    function setFactory(address _factory)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        factory = address(_factory);
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
