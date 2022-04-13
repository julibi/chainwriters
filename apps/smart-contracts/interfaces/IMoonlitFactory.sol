//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface IMoonlitFactory {
  function createDao ( string calldata _title, string calldata _textIpfsHash, uint256 _initialMintPrice, uint256 _firstEditionAmount ) external returns ( address );
  function firstEditionMax (  ) external view returns ( uint256 );
  function firstEditionMin (  ) external view returns ( uint256 );
  function moonlitDaos ( uint256 ) external view returns ( address );
  function owner (  ) external view returns ( address );
  function setFirstEditionMinMax ( uint256 _min, uint256 _max ) external;
  function transferOwnership ( address _newOwner ) external;
}
