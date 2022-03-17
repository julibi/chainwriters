//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface IMoonlitFactory {
  function createDao (
    string calldata _title,
    string calldata _subtitle,
    string calldata _genre,
    string calldata _ipfsLink,
    uint256 _initialMintPrice
  ) external returns ( address );
  function firstEditionMax (  ) external view returns ( uint256 );
  function moonlitDaos ( uint256 ) external view returns ( address );
  function moonlitDaosLength (  ) external view returns ( uint256 );
  function owner (  ) external view returns ( address );
  // function renounceOwnership (  ) external;
  function setFirstEditionMax ( uint256 _amount ) external;
  // function transferOwnership ( address newOwner ) external;
}
