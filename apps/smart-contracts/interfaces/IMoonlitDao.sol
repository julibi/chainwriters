//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;


interface IMoonlitDao {
    function greet() external view returns (string memory);
    function setGreet() external;
}