// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract TestRoyalties is ERC1155, Ownable, ERC1155Supply {
    address public artist;
    uint256 public feeAmount;

    mapping(uint256 => bool) public excludeList;

    constructor(address _artist, uint256 _feeAmount) ERC1155("") {
        artist = _artist;
        feeAmount = _feeAmount;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    function setExcluded(uint256 tokenId, bool status) external {
        require(
            msg.sender == artist,
            "only the artist can change the exclude value"
        );
        excludeList[tokenId] = status;
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

    function _safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        require(from != address(0x0), "invalid from address");
        require(to != address(0x0), "invalid to address");
        // TODO: and smaller than currentEdition
        require(tokenId > 0, "invalid tokenId");
        require(
            from == msg.sender || isApprovedForAll(from, msg.sender),
            "ERC1155: caller is not owner nor approved"
        );

        if (excludeList[tokenId] == false) {
            payTxFee(from);
        }

        super._safeTransferFrom(from, to, tokenId, 1, "");
    }

    function payTxFee(address _from) internal {
        // token.transferFrom(_from, artist, feeAmount);
        payable(artist).transfer(feeAmount);
    }
}
