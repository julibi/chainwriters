// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "erc721a/contracts/ERC721A.sol";
import "../interfaces/IMoonlitDao.sol";

contract MoonlitNFT is ERC721A, AccessControlEnumerable, Ownable {
    uint256 public MAX_NFTS;
    bool public METADATA_FROZEN;
    string public NAME;
    address public AUTHOR;
    uint256 public MAX_PER_MINT;
    uint256 public mintPrice;
    string public baseUri;
    IMoonlitDao public MoonlitDao;

    event SetBaseUri(string indexed baseUri);

    constructor(
      address _mld,
      string memory _name,
      uint256 _maxNfts,
      address _author,
      string memory _baseUri
    ) ERC721A("MoonlitNFT", "MNLT") {
        // author should be admin
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        MoonlitDao = IMoonlitDao(_mld);
        NAME = _name;
        AUTHOR = _author;
        MAX_NFTS = _maxNfts;
        baseUri = _baseUri;
        mintPrice = 0.001 ether; 
        MAX_PER_MINT = 5;
        METADATA_FROZEN = false;
    }

    modifier whenMetadataNotFrozen {
      require(!METADATA_FROZEN, "Metadata already frozen.");
      _;
    }

    // ------------------
    // Explicit overrides
    // ------------------
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721A, AccessControlEnumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 _tokenId) public view override(ERC721A) returns (string memory) {
      require(_exists(_tokenId), "Token does not exist.");
      return baseUri;
    }

    // ------------------
    // Functions for the owner
    // ------------------

    function setBaseUri(string memory _baseUri) external onlyRole(DEFAULT_ADMIN_ROLE) whenMetadataNotFrozen {
      baseUri = _baseUri;
      emit SetBaseUri(baseUri);
    }

    function freezeMetadata() external onlyRole(DEFAULT_ADMIN_ROLE) whenMetadataNotFrozen {
      METADATA_FROZEN = true;
    }

    function setMintPrice(uint256 _mintPrice) external onlyRole(DEFAULT_ADMIN_ROLE) {
      mintPrice = _mintPrice;
    }

    // Withdrawing
    // dao contract is calling it and inside dao, the distribution of gains is done
    function withdraw(address _to) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_to != address(0), "Cannot withdraw to the 0 address");
        uint256 balance = address(this).balance;
        payable(_to).transfer(balance);
    }

    function withdrawTokens(
        IERC20 token,
        address receiver,
        uint256 amount
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(receiver != address(0), "Cannot withdraw tokens to the 0 address");
        token.transfer(receiver, amount);
    }

    // ------------------
    // Functions for external minting
    // ------------------

    // External

    function mintNFTs(uint256 amount) external payable {
      require(totalSupply() + amount <= MAX_NFTS, "Purchase would exceed cap");
      require(amount <= MAX_PER_MINT, "Amount exceeds max per mint");
      _mint(amount);
    }

    // Internal

    function _mint(uint256 amount) internal {
      require(mintPrice * amount <= msg.value, "Ether value sent is not correct");
      _safeMint(msg.sender, amount);
    }
}