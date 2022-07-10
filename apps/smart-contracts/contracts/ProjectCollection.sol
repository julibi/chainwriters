//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract ProjectCollection is
    ERC1155,
    AccessControlEnumerable,
    ERC1155Supply,
    Pausable
{
    bytes32 public constant AUTHOR_ROLE = keccak256("AUTHOR_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    uint256 public totalSharePercentage = 15;
    address public factory;
    string public name;

    uint256 public discountRate;
    uint256 public startAt;
    uint256 public expiresAt;
    bool public auctionStarted = false;
    bool public auctionPhaseFinished = false;

    constructor(
        string memory _title,
        address _caller,
        address _factory
    ) ERC1155("") {
        name = _title;
        factory = _factory;
        _setupRole(PAUSER_ROLE, _factory);
        _setupRole(PAUSER_ROLE, _caller);
        _setupRole(AUTHOR_ROLE, _caller);
    }

    function authorMint(uint256 _amount, string memory _newUri)
        external
        onlyRole(AUTHOR_ROLE)
        whenNotPaused
    {
        _setURI(_newUri);
        _mint(msg.sender, 1, _amount, "");
    }

    function mint(uint256 _amount) external payable whenNotPaused {
        // currentEdition second argument
        _mint(msg.sender, 1, _amount, "");
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

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControlEnumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
