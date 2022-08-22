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
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "../interfaces/IMoonpageManager.sol";
import "../interfaces/IAuctionsManager.sol";

contract MoonpageCollection is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Ownable,
    Pausable,
    ReentrancyGuard,
    ERC2981
{
    uint256 public maxMintableCreator = 4;
    IMoonpageManager public moonpageManager;
    IAuctionsManager public auctionsManager;
    address public moonpageDev;
    uint256 royaltyFraction = 700;

    event Minted(
        uint256 projectId,
        uint256 edition,
        address account,
        uint256 tokenId
    );

    constructor() ERC721("Moonpage", "MP") {
        moonpageDev = msg.sender;
    }

    modifier noNullAddress(address _address) {
        require(_address != address(0), "Invalid 0 address");
        _;
    }

    modifier onlyDaoManager() {
        require(msg.sender == address(moonpageManager), "Not authorized");
        _;
    }

    modifier ifProjectExists(uint256 _projectId) {
        require(moonpageManager.exists(_projectId), "Invalid projectId");
        _;
    }

    modifier onlyProjectCreator(uint256 _projectId) {
        (, , , address creatorAddress, , , , , , , ) = moonpageManager
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
        require(currentTokenId <= lastGenEdTokenId, "Amount exceeds cap");
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
        (, , , , , , , , , , uint256 premintedByCreator) = moonpageManager
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
        mint(_projectId, moonpageDev, 1);
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
        bool isProjectPaused = moonpageManager.isPaused(_projectId);
        require(!isProjectPaused, "Project paused");
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

    function setAddresses(
        address _mpManager,
        address _aManager,
        address _mpDev
    ) external onlyOwner {
        moonpageManager = IMoonpageManager(_mpManager);
        auctionsManager = IAuctionsManager(_aManager);
        moonpageDev = address(_mpDev);
    }

    function setRoyaltyFraction(uint256 _fraction) external onlyOwner {
        royaltyFraction = _fraction;
    }

    function setMaxMintableCreator(uint256 _maxAmount) external onlyOwner {
        maxMintableCreator = _maxAmount;
    }

    function emergencyWithdraw(address _to, uint256 _amount)
        external
        onlyOwner
        noNullAddress(_to)
    {
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

    function withdraw(address _to, uint256 _amount)
        external
        onlyDaoManager
        noNullAddress(_to)
    {
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
            ,
            ,
            ,
            ,
            string memory imgIpfsHash,
            string memory animationIpfsHash,
            ,
            ,

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

    function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
        external
        view
        virtual
        override
        returns (address, uint256)
    {
        uint256 projectId = moonpageManager.projectIdOfToken(_tokenId);
        require(projectId > 0, "Invalid tokenId");
        (, , , , address royaltyReceiver, , , , , , ) = moonpageManager
            .readBaseData(projectId);
        uint256 royaltyAmount = (_salePrice * royaltyFraction) / 10000;
        return (royaltyReceiver, royaltyAmount);
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
        override(ERC721, ERC721Enumerable, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
