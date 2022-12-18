//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract NFTAirdrop is Pausable {
    struct AirdropItem {
        address nft;
        uint256 id;
    }
    address public admin;
    uint256 public nextAirdropId = 0;
    uint256 public airdropItemsIndex = 0;
    uint256 public recipientsIndex = 0;
    mapping(uint256 => AirdropItem) public airdrops;
    mapping(address => bool) public recipients;
    event Claimed(uint256 nftId, address nftContract, address claimer);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "not authorized");
        _;
    }

    // ------------------
    // Public functions
    // -----------------

    function claim() external whenNotPaused {
        require(recipients[msg.sender] == true, "recipient not registered");
        recipients[msg.sender] = false;
        AirdropItem storage airdrop = airdrops[nextAirdropId];

        IERC721(airdrop.nft).safeTransferFrom(
            address(this),
            msg.sender,
            airdrop.id
        );
        nextAirdropId++;
        recipientsIndex--;
        emit Claimed(airdrop.id, airdrop.nft, msg.sender);
    }

    // ------------------
    // Admin functions
    // -----------------

    function addAirdropItems(AirdropItem[] memory _airdropItems)
        external
        onlyAdmin
    {
        uint256 _nextAirdropId = nextAirdropId;

        for (uint256 i = 0; i < _airdropItems.length; i++) {
            airdrops[_nextAirdropId] = _airdropItems[i];

            IERC721(_airdropItems[i].nft).safeTransferFrom(
                msg.sender,
                address(this),
                _airdropItems[i].id
            );
            _nextAirdropId++;
            airdropItemsIndex++;
        }
    }

    function addRecipients(address[] memory _recipients) external onlyAdmin {
        for (uint256 i = 0; i < _recipients.length; i++) {
            recipients[_recipients[i]] = true;
            recipientsIndex++;
        }
    }

    function removeRecipients(address[] memory _recipients) external onlyAdmin {
        for (uint256 i = 0; i < _recipients.length; i++) {
            recipients[_recipients[i]] = false;
            recipientsIndex--;
        }
    }

    // for resetting when airdrop finishes
    function closeAirdrop(address[] memory _unclaimedAddresses)
        external
        onlyAdmin
    {
        require(
            recipientsIndex == _unclaimedAddresses.length,
            "include all addresses to reset"
        );
        for (uint256 i = 0; i < _unclaimedAddresses.length; i++) {
            recipients[_unclaimedAddresses[i]] = false;
            recipientsIndex--;
        }

        for (uint256 i = 0; i < airdropItemsIndex; i++) {
            delete airdrops[airdropItemsIndex];
        }

        airdropItemsIndex = 0;
        nextAirdropId = 0;
    }

    // for a different kind of airdrop
    // in case we want an airdrop without making the user claim
    function bulkTransfer(
        address _nftContract,
        address _from,
        address[] calldata _to,
        uint256[] calldata _id
    ) external onlyAdmin whenNotPaused {
        require(
            _to.length == _id.length,
            "receivers and IDs are different length"
        );
        for (uint256 i = 0; i < _to.length; i++) {
            IERC721(_nftContract).safeTransferFrom(_from, _to[i], _id[i]);
        }
    }

    // ------------------
    // Other
    // -----------------

    function pause() external onlyAdmin {
        _pause();
    }

    function unpause() external onlyAdmin {
        _unpause();
    }

    function withdraw(address _to) external payable onlyAdmin {
        require(_to != address(0), "Invalid 0 address");
        payable(_to).transfer(address(this).balance);
    }

    receive() external payable {}
}
