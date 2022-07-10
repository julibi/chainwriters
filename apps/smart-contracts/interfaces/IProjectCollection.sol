//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface IProjectCollection {
    function AUTHOR_ROLE() external view returns (bytes32);

    function DEFAULT_ADMIN_ROLE() external view returns (bytes32);

    function PAUSER_ROLE() external view returns (bytes32);

    function auctionPhaseFinished() external view returns (bool);

    function auctionStarted() external view returns (bool);

    function authorMint(uint256 _amount, string calldata _newUri) external;

    function balanceOf(address account, uint256 id)
        external
        view
        returns (uint256);

    function balanceOfBatch(address[] calldata accounts, uint256[] calldata ids)
        external
        view
        returns (uint256[] memory);

    function discountRate() external view returns (uint256);

    function exists(uint256 id) external view returns (bool);

    function expiresAt() external view returns (uint256);

    function factory() external view returns (address);

    function getRoleAdmin(bytes32 role) external view returns (bytes32);

    function getRoleMember(bytes32 role, uint256 index)
        external
        view
        returns (address);

    function getRoleMemberCount(bytes32 role) external view returns (uint256);

    function grantRole(bytes32 role, address account) external;

    function hasRole(bytes32 role, address account)
        external
        view
        returns (bool);

    function isApprovedForAll(address account, address operator)
        external
        view
        returns (bool);

    function mint(uint256 _amount) external;

    function name() external view returns (string memory);

    function pause() external;

    function paused() external view returns (bool);

    function renounceRole(bytes32 role, address account) external;

    function revokeRole(bytes32 role, address account) external;

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts,
        bytes calldata data
    ) external;

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes calldata data
    ) external;

    function setApprovalForAll(address operator, bool approved) external;

    function startAt() external view returns (uint256);

    function supportsInterface(bytes4 interfaceId) external view returns (bool);

    function totalSharePercentage() external view returns (uint256);

    function totalSupply(uint256 id) external view returns (uint256);

    function unpause() external;

    function uri(uint256) external view returns (string memory);
}
