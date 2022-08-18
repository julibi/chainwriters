//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "../interfaces/IMoonpageManager.sol";
import "../interfaces/IAuctionsManager.sol";

contract MoonpageCollection is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Ownable,
    Pausable,
    ReentrancyGuard
{
    uint256 public maxMintableCreator = 4;
    IMoonpageManager public moonpageManager;
    IAuctionsManager public auctionsManager;

    event Minted(
        uint256 projectId,
        uint256 edition,
        address account,
        uint256 tokenId
    );

    constructor() ERC721("Moonpage", "MP") {}

    modifier onlyDaoManager() {
        require(msg.sender == address(moonpageManager), "Not authorized");
        _;
    }

    modifier ifProjectExists(uint256 _projectId) {
        require(moonpageManager.exists(_projectId), "Invalid projectId");
        _;
    }

    modifier onlyProjectCreator(uint256 _projectId) {
        (, , , address creatorAddress, , , , , , ) = moonpageManager
            .readBaseData(_projectId);
        require(msg.sender == address(creatorAddress), "Not authorized");
        _;
    }

    // the first edition is being sold in a reverse auction
    function buy(uint256 _projectId)
        external
        payable
        whenNotPaused
        nonReentrant
    {
        (
            ,
            uint256 mintPrice,
            ,
            uint256 currentTokenId,
            uint256 lastGenEdTokenId,
            ,

        ) = moonpageManager.readEditionData(_projectId);
        (, , , , , bool auctionsStarted, bool auctionsEnded) = auctionsManager
            .readAuctionSettings(_projectId);
        require(auctionsStarted, "Auctions have not started");
        require(!auctionsEnded, "Auctions ended");
        require(currentTokenId <= lastGenEdTokenId, "Amount exceeds cap.");
        uint256 price = auctionsManager.getPrice(_projectId, mintPrice);
        require(msg.value >= price, "Value sent not sufficient");

        mint(_projectId, msg.sender, 1);
        moonpageManager.increaseBalance(_projectId, price);

        bool shouldFinalize = currentTokenId == lastGenEdTokenId;
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
        nonReentrant
    {
        (
            uint256 current,
            uint256 mintPrice,
            ,
            uint256 currentTokenId,
            ,
            uint256 currentEdLastTokenId,

        ) = moonpageManager.readEditionData(_projectId);
        require(current > 1, "Public minting possible from edition 2");
        require(
            (currentTokenId + _amount - 1) <= currentEdLastTokenId,
            "Amount exceeds cap"
        );
        require(
            msg.value >= (mintPrice * _amount),
            "Value sent not sufficient"
        );
        bool shouldFinalize = (currentTokenId + _amount - 1) ==
            currentEdLastTokenId;
        moonpageManager.increaseBalance(_projectId, mintPrice * _amount);
        mint(_projectId, msg.sender, _amount);
        if (shouldFinalize) {
            moonpageManager.distributeShares(_projectId);
        }
    }

    // ------------------
    // Functions for Creator
    // ------------------

    function startAuctions(
        uint256 _projectId,
        uint256 _amountForCreator,
        uint256 _discountRate
    )
        external
        whenNotPaused
        nonReentrant
        ifProjectExists(_projectId)
        onlyProjectCreator(_projectId)
    {
        (, , , , , , , , , uint256 premintedByCreator) = moonpageManager
            .readBaseData(_projectId);
        require(
            (premintedByCreator == 0) && !moonpageManager.isFrozen(_projectId),
            "Auctions already started"
        );
        require(
            (_amountForCreator > 0) &&
                (_amountForCreator <= maxMintableCreator),
            "Invalid amount for maxMintableCreator"
        );
        auctionsManager.startAuctions(_projectId, _discountRate);
        moonpageManager.setIsBaseDataFrozen(_projectId, true);
        moonpageManager.setPremintedByCreator(_projectId, _amountForCreator);
        mint(_projectId, msg.sender, _amountForCreator);
    }

    // ------------------
    // Internal & Private functions
    // ------------------

    function mint(
        uint256 _projectId,
        address _receiver,
        uint256 _amount
    ) internal {
        // todo some more requires, so that I cannot mint some randome tokens
        require(_receiver != address(0), "No null address");
        (
            uint256 current,
            ,
            ,
            uint256 currentTokenId,
            ,
            uint256 currentEdLastTokenId,

        ) = moonpageManager.readEditionData(_projectId);
        for (uint256 i = 0; i < _amount; i++) {
            if (currentTokenId <= currentEdLastTokenId) {
                _safeMint(_receiver, currentTokenId + i);
                emit Minted(_projectId, current, _receiver, currentTokenId + i);
                moonpageManager.increaseCurrentTokenId(_projectId);
            }
        }
    }

    // ------------------
    // Admin functions
    // -----------------

    function setContracts(address _mpManager, address _aManager)
        external
        onlyOwner
    {
        moonpageManager = IMoonpageManager(_mpManager);
        auctionsManager = IAuctionsManager(_aManager);
    }

    function setMaxMintableCreator(uint256 _maxAmount) external onlyOwner {
        maxMintableCreator = _maxAmount;
    }

    function emergencyWithdraw(address _to, uint256 _amount)
        external
        onlyOwner
    {
        require(_to != address(0), "Cannot withdraw to the 0 address");
        payable(_to).transfer(_amount);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
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

    function tokenURI(uint256 _tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        uint256 projectId = moonpageManager.projectIdOfToken(_tokenId);
        uint256 edition = moonpageManager.editionOfToken(projectId, _tokenId);
        (
            string memory title,
            ,
            string memory genre,
            address creatorAddress,
            ,
            string memory imgIpfsHash,
            string memory animationIpfsHash,
            ,
            string memory originalLanguage,

        ) = moonpageManager.readBaseData(projectId);
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        title,
                        " #",
                        Strings.toString(_tokenId),
                        '", "description": "',
                        'A Moonpage DAO Literature NFT", ',
                        '"image": "ipfs://',
                        imgIpfsHash,
                        '", ',
                        '"animation_url": "ipfs://',
                        animationIpfsHash,
                        '",',
                        '"attributes": [{ "trait_type": "Edition", "value": "',
                        Strings.toString(edition),
                        '" }]}'
                    )
                )
            )
        );
        json = string(abi.encodePacked("data:application/json;base64,", json));
        return json;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
