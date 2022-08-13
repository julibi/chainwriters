//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "../interfaces/IMoonpageCollection.sol";
import "../interfaces/IMoonpageManager.sol";

contract SharesDistributor is Pausable {
    using SafeMath for uint256;
    uint256 public fee = 15;
    IMoonpageCollection public collection;
    IMoonpageManager public moonpageManager;
    event FeeUpdated(uint256 newFee);
    event ContractsUpdated(
        uint256 collectionAddress,
        uint256 moonpageManagerAddress
    );

    constructor(address _collection, address _moonpageManager) {
        collection = IMoonpageCollection(_collection);
        moonpageManager = IMoonpageManager(_moonpageManager);
    }

    modifier onlyCollection() {
        require(msg.sender == address(collection), "Not authorized");
        _;
    }

    function distributeShares(uint256 _projectId)
        external
        whenNotPaused
        onlyCollection
    {
        (, , , address creatorAddress, , , , , ) = moonpageManager.readBaseData(
            projectId
        );
        uint256 balanceTotal = moonpageManager.readProjectBalance(_projectId);
        uint256 contribIndex = moonpageManager.readContributionIndex(
            _projectId
        );
        (uint256 authorShare, uint256 authorShareInMatic) = moonpageManager
            .readAuthorShare(_projectId);
        uint256 leftShares = 100 - fee;
        uint256 foundationShareInMatic = (balanceTotal * fee) / 100;
        if (contribIndex == 0) {
            authorShare = leftShares;
            authorShareInMatic = (balanceTotal * leftShares) / 100;
        } else {
            for (uint256 i = 0; i < contribIndex; i++) {
                (
                    address contribShareRecipient,
                    ,
                    uint256 contribShare,
                    uint256 contribShareInMatic
                ) = readContribution(_projectId, i);
                leftShares = leftShares - contribShare;
                contribShareInMatic = (balanceTotal * contribShare) / 100;
                if (i == (contribIndex - 1)) {
                    authorShare = leftShares;
                    authorShareInMatic = (balanceTotal * leftShares) / 100;
                }
                collection.withdraw(contribShareRecipient, contribShareInMatic);
            }
        }

        collection.withdraw(creatorAddress, authorShareInMatic);
        collection.withdraw(factory, foundationShareInMatic);
        // reentrancy?
        moonpageManager.resetBalance();
    }

    // ------------------
    // Admin Functions
    // ------------------

    function setFee(uint256 _newFee) external onlyOwner {
        fee = _newFee;
        emit FeeUpdated(_newFee);
    }

    function setContracts(address _collection, address _moonpageManager)
        external
        onlyOwner
    {
        collection = IMoonpageCollection(_collection);
        moonpageManager = address(_moonpageManager);
        emit ContractsUpdated(_collection, _moonpageManager);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    receive() external payable {}
}
