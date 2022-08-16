//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract DummyFactoryV2 is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    string public name;
    string public age;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(string memory _name) public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        name = _name;
    }

    function namo() public view returns (string memory) {
        return name;
    }

    function ago() public view returns (string memory) {
        return age;
    }

    function setAge(string memory _newage) public {
        age = _newage;
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}
}
