//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract ProjectDao is AccessControlEnumerable, Pausable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    uint256 public projectsLength = 0;
    string public factory;
    uint256 public fee = 15;
    uint256 public MAX_PER_WALLET = 5;
    struct BaseData {
        string title;
        string subtitle;
        string genre;
        address author_address;
        string textIpfsHash;
        string imgIpfsHash;
        string blurbIpfsHash;
        uint256 premintedByAuthor;
    }
    struct AuthorShare {
        uint256 share;
        uint256 shareInMatic;
        uint256 claimedAmount;
        bool hasClaimedGenesis;
    }
    struct Contribution {
        address shareRecipient;
        string role;
        uint256 share;
        uint256 shareInMatic;
        uint8 contributorIndex;
    }
    struct Edition {
        uint256 currentEdition;
        uint256 currentEditionMax;
        uint256 currentEditionMintPrice;
    }
    struct Project {
        Edition edition;
        BaseData baseData;
        AuthorShare authorShare;
        // Contribution[] contributions;
        // mapping(uint256 => Contribution) contributions;
        bool paused;
        address collection;
    }
    mapping(uint256 => Project) public projects;

    event Configured(
        string imgHash,
        string blurbHash,
        string newGenre,
        string newSubtitle
    );
    event TextSet(string textHash);
    event ContributorAdded(address contributor, uint256 share, string role);
    event URISet(string uri);
    event Paused(bool paused);

    constructor() {
        // _setupRole(PAUSER_ROLE, _factory);
        factory = "HELLO";
    }

    modifier isAuthor(uint256 _id) {
        require(
            msg.sender == projects[_id].baseData.author_address,
            "Not author."
        );
        _;
    }

    function setupDao(
        string calldata _title,
        string calldata _textCID,
        uint256 _startPrice,
        uint256 _maxAmount
    ) external {
        Edition memory newEdition = Edition(1, _maxAmount, _startPrice);
        BaseData memory newBaseData = BaseData(
            _title,
            "",
            "",
            address(msg.sender),
            _textCID,
            "",
            "",
            0
        );
        AuthorShare memory newAuthorShare = AuthorShare(100 - fee, 0, 0, false);
        // Contribution calldata newContribution = Contribution(address(0), "", 0, 0, 0);
        // Contribution[] storage newContributions;
        //mapping(uint256 => Contribution) memory newContributions;
        //newContributions.push(newContribution);
        Project memory newProject = Project(
            newEdition,
            newBaseData,
            newAuthorShare,
            //   newContributions,
            false,
            address(0)
        );
        projectsLength++;
        projects[projectsLength] = newProject;
    }

    function setGenre(uint256 _id, string calldata _genre)
        external
        isAuthor(_id)
    {
        projects[_id].baseData.genre = _genre;
    }

    // ------------------
    // Private functions
    // ------------------

    // withdrawing must happen inside collection, too
    // function distributeShares() private {
    //     uint256 shareAuthor = 85;
    //     uint256 balanceTotal = address(this).balance;
    //     uint256 foundationShareInMatic = (balanceTotal * 15) / 100;
    //     for (uint256 i = 0; i < contributorIndex; i++) {
    //         shareAuthor = shareAuthor - contributors[i].share;
    //         contributors[i].shareInMatic =
    //             (balanceTotal * contributors[i].share) /
    //             100;
    //         if (i == (contributorIndex - 1)) {
    //             author.share = shareAuthor;
    //             author.shareInMatic = (balanceTotal * shareAuthor) / 100;
    //         }
    //         withdraw(
    //             contributors[i].shareRecipient,
    //             contributors[i].shareInMatic
    //         );
    //     }
    //     withdraw(factory, foundationShareInMatic);
    //     withdraw(project.author_address, author.shareInMatic);
    // }

    // test from private to internal
    // function withdraw(address _to, uint256 _amount) internal {
    //     require(_to != address(0), "Cannot withdraw to the 0 address");
    //     payable(_to).transfer(_amount);
    // }

    // ------------------
    // Functions for the author
    // ------------------

    // add role of contributor
    // function addContributors(
    //     address[] calldata _contributors,
    //     uint256[] calldata _shares,
    //     string[] calldata _roles
    // ) external onlyRole(AUTHOR_ROLE) whenNotPaused {
    //     // in theory user can put the same contributor 3 times - we don't care
    //     require(!auctionStarted, "Cannot change after auction started");
    //     require(
    //         (contributorIndex + _contributors.length) <= 3,
    //         "Max 3 contributors"
    //     );
    //     require(
    //         (_contributors.length == _shares.length) &&
    //             (_contributors.length == _roles.length),
    //         "Same length required"
    //     );
    //     uint256 contribTotalShares = 0;
    //     for (uint8 i = 0; i < _contributors.length; i++) {
    //         contribTotalShares += _shares[i];
    //     }
    //     require(contribTotalShares <= 85, "Contributor shares too high");

    //     totalSharePercentage += contribTotalShares;
    //     for (uint8 i = 0; i < _contributors.length; i++) {
    //         require(
    //             _contributors[i] != address(0),
    //             "Contributor cannot be 0 address"
    //         );
    //         contributors[contributorIndex].shareRecipient = _contributors[i];
    //         contributors[contributorIndex].share = _shares[i];
    //         contributors[contributorIndex].role = _roles[i];
    //         contributorIndex++;
    //         emit ContributorAdded(_contributors[i], _shares[i], _roles[i]);
    //     }
    // }

    // function configureProjectDetails(
    //     string calldata _imgHash,
    //     string calldata _blurbHash,
    //     string memory _genre,
    //     string memory _subtitle
    // ) external onlyRole(AUTHOR_ROLE) whenNotPaused {
    //     require(
    //         !auctionStarted,
    //         "Configuration only possible before auctions start"
    //     );
    //     project.imgIpfsHash = _imgHash;
    //     project.blurbIpfsHash = _blurbHash;
    //     project.genre = _genre;
    //     project.subtitle = _subtitle;

    //     emit Configured(_imgHash, _blurbHash, _genre, _subtitle);
    // }

    // function setTextIpfsHash(string memory _ipfsHash)
    //     external
    //     onlyRole(AUTHOR_ROLE)
    //     whenNotPaused
    // {
    //     require(
    //         !auctionStarted,
    //         "Configuration only possible before auctions start"
    //     );
    //     project.textIpfsHash = _ipfsHash;
    //     emit TextSet(_ipfsHash);
    // }

    // ------------------
    // Can only be called by Foundation
    // ------------------

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
