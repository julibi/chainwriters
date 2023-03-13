//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract MoonpageProfiles is
    Initializable,
    PausableUpgradeable,
    AccessControlUpgradeable,
    UUPSUpgradeable
{
    using SafeMath for uint256;
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    struct Profile {
        string name;
        string imageIPFSHash;
        string descriptionIPFSHash;
        string website;
        string discord;
        string instagram;
        string paragraphxyz;
        string substack;
        string twitter;
        string youtube;
        bool isVerified;
    }
    mapping(address => Profile) public profiles;

    event ProfileConfigured(
        address userAddress,
        string name,
        string imageIPFSHash,
        string descriptionIPFSHash,
        string website
    );
    event SocialsConfigured(
        address userAddress,
        string discord,
        string instagram,
        string paragraphxyz,
        string substack,
        string twitter,
        string youtube
    );
    event DiscordConfigured(address userAddress, string discord);
    event InstagramConfigured(address userAddress, string instagram);
    event ParagraphxyzConfigured(address userAddress, string paragraphyxyz);
    event SubstackConfigured(address userAddress, string substack);
    event TwitterConfigured(address userAddress, string twitter);
    event YoutubeConfigured(address userAddress, string youtube);
    event ProfileReset(address userAddress);
    event VerificationSet(address userAddress, bool isVerified);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __Pausable_init();
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    // ------------------
    // Write functions for creators
    // ------------------

    function configureProfile(
        address _userAddress,
        string memory _name,
        string memory _imageIPFSHash,
        string memory _descriptionIPFSHash,
        string memory _website
    ) external whenNotPaused {
        require(msg.sender == address(_userAddress), "Not authorized");
        profiles[_userAddress].name = _name;
        profiles[_userAddress].imageIPFSHash = _imageIPFSHash;
        profiles[_userAddress].descriptionIPFSHash = _descriptionIPFSHash;
        profiles[_userAddress].website = _website;
        profiles[_userAddress].isVerified = false;

        emit ProfileConfigured(
            _userAddress,
            _name,
            _imageIPFSHash,
            _descriptionIPFSHash,
            _website
        );
    }

    function configureSocials(
        string memory _discord,
        string memory _instagram,
        string memory _paragraphxyz,
        string memory _substack,
        string memory _twitter,
        string memory _youtube
    ) external whenNotPaused {
        profiles[msg.sender].discord = _discord;
        profiles[msg.sender].instagram = _instagram;
        profiles[msg.sender].paragraphxyz = _paragraphxyz;
        profiles[msg.sender].substack = _substack;
        profiles[msg.sender].twitter = _twitter;
        profiles[msg.sender].youtube = _youtube;
        profiles[msg.sender].isVerified = false;

        emit SocialsConfigured(
            msg.sender,
            _discord,
            _instagram,
            _paragraphxyz,
            _substack,
            _twitter,
            _youtube
        );
    }

    function configureDiscord(string memory _discord) external whenNotPaused {
        profiles[msg.sender].discord = _discord;
        profiles[msg.sender].isVerified = false;

        emit DiscordConfigured(msg.sender, _discord);
    }

    function configureInstagram(string memory _instagram)
        external
        whenNotPaused
    {
        profiles[msg.sender].instagram = _instagram;
        profiles[msg.sender].isVerified = false;

        emit InstagramConfigured(msg.sender, _instagram);
    }

    function configureParagraphxyz(string memory _paragraphxyz)
        external
        whenNotPaused
    {
        profiles[msg.sender].paragraphxyz = _paragraphxyz;
        profiles[msg.sender].isVerified = false;

        emit ParagraphxyzConfigured(msg.sender, _paragraphxyz);
    }

    function configureSubstack(string memory _substack) external whenNotPaused {
        profiles[msg.sender].substack = _substack;
        profiles[msg.sender].isVerified = false;

        emit SubstackConfigured(msg.sender, _substack);
    }

    function configureTwitter(string memory _twitter) external whenNotPaused {
        profiles[msg.sender].twitter = _twitter;
        profiles[msg.sender].isVerified = false;

        emit TwitterConfigured(msg.sender, _twitter);
    }

    function configureYoutube(string memory _youtube) external whenNotPaused {
        profiles[msg.sender].youtube = _youtube;
        profiles[msg.sender].isVerified = false;

        emit YoutubeConfigured(msg.sender, _youtube);
    }

    function resetProfile(address _userAddress) external whenNotPaused {
        require(msg.sender == address(_userAddress), "Not authorized");

        // TODO: should be empty string or null??
        profiles[msg.sender].name = "";
        profiles[msg.sender].imageIPFSHash = "";
        profiles[msg.sender].descriptionIPFSHash = "";
        profiles[msg.sender].website = "";
        profiles[msg.sender].discord = "";
        profiles[msg.sender].instagram = "";
        profiles[msg.sender].paragraphxyz = "";
        profiles[msg.sender].substack = "";
        profiles[msg.sender].twitter = "";
        profiles[msg.sender].youtube = "";
        profiles[msg.sender].isVerified = false;

        emit ProfileReset(msg.sender);
    }

    // ------------------
    // Admin Functions
    // ------------------

    function setIsVerified(
        address[] memory _userAddresses,
        bool[] memory _isVerified
    ) external onlyRole(DEFAULT_ADMIN_ROLE) whenNotPaused {
        require(_userAddresses.length == _isVerified.length, "Not same length");
        for (uint8 i = 0; i < _userAddresses.length; i++) {
            profiles[_userAddresses[i]].isVerified = _isVerified[i];

            emit VerificationSet(_userAddresses[i], _isVerified[i]);
        }
    }

    // ------------------
    // Just in case
    // ------------------

    receive() external payable {}

    function withdraw(address _to)
        external
        payable
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(_to != address(0), "Cannot withdraw to the 0 address");
        payable(_to).transfer(address(this).balance);
    }

    // ------------------
    // Explicit overrides
    // ------------------

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyRole(UPGRADER_ROLE)
    {}
}
