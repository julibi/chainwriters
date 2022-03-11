//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface IMoonlitNFT {
  function AUTHOR (  ) external view returns ( address );
  function DEFAULT_ADMIN_ROLE (  ) external view returns ( bytes32 );
  function MAX_NFTS (  ) external view returns ( uint256 );
  function MAX_PER_MINT (  ) external view returns ( uint256 );
  function METADATA_FROZEN (  ) external view returns ( bool );
  function MoonlitDao (  ) external view returns ( address );
  function NAME (  ) external view returns ( string memory);
  function approve ( address to, uint256 tokenId ) external;
  function balanceOf ( address owner ) external view returns ( uint256 );
  function baseUri (  ) external view returns ( string memory);
  function freezeMetadata (  ) external;
  function getApproved ( uint256 tokenId ) external view returns ( address );
  function getRoleAdmin ( bytes32 role ) external view returns ( bytes32 );
  function getRoleMember ( bytes32 role, uint256 index ) external view returns ( address );
  function getRoleMemberCount ( bytes32 role ) external view returns ( uint256 );
  function grantRole ( bytes32 role, address account ) external;
  function hasRole ( bytes32 role, address account ) external view returns ( bool );
  function isApprovedForAll ( address owner, address operator ) external view returns ( bool );
  function mintNFTs ( uint256 amount ) external;
  function mintPrice (  ) external view returns ( uint256 );
  function name (  ) external view returns ( string memory);
  function owner (  ) external view returns ( address );
  function ownerOf ( uint256 tokenId ) external view returns ( address );
  function renounceOwnership (  ) external;
  function renounceRole ( bytes32 role, address account ) external;
  function revokeRole ( bytes32 role, address account ) external;
  function safeTransferFrom ( address from, address to, uint256 tokenId ) external;
  function safeTransferFrom ( address from, address to, uint256 tokenId, bytes calldata _data ) external;
  function setApprovalForAll ( address operator, bool approved ) external;
  function setBaseUri ( string calldata _baseUri) external;
  function setMintPrice ( uint256 _mintPrice ) external;
  function supportsInterface ( bytes4 interfaceId ) external view returns ( bool );
  function symbol (  ) external view returns ( string memory);
  function tokenURI ( uint256 _tokenId ) external view returns ( string memory);
  function totalSupply (  ) external view returns ( uint256 );
  function transferFrom ( address from, address to, uint256 tokenId ) external;
  function transferOwnership ( address newOwner ) external;
  function withdraw ( address _to ) external;
  function withdrawTokens ( address token, address receiver, uint256 amount ) external;
}
