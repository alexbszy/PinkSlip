// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract PinkSlip {

   struct Fill {
      uint256 fillId;
      address makerAddress;
      address takerAddress;
      uint256 makerWager;
      uint256 takerWager;
      uint256 payout;
      uint256 timestamp;
      string makerTeamToWin;
      string takerTeamToWin;
      string matchId;
      address payable winner;
   }

    address agent;
    mapping(address => uint256) public unlockedDeposits;
    mapping(address => uint256) public lockedDeposits;
    Fill[] public fills;
    uint256 public fillsLength = 0;

    modifier onlyAgent() {
        require(msg.sender == agent);
        _;
    }

    constructor() public {
        agent = msg.sender;
    }

    function desposit() public payable {
        address senderAddress = msg.sender;
        uint256 amount = msg.value;
        unlockedDeposits[senderAddress] = unlockedDeposits[senderAddress] + amount;
    }

    function withdrawUnlocked(uint256 amount) public {
        address payable senderAddress = payable(msg.sender);
        require(amount <= unlockedDeposits[senderAddress]);
        unlockedDeposits[senderAddress] = unlockedDeposits[senderAddress] - amount;
        senderAddress.transfer(amount);
    }

    function addFill
        (
            uint256 fillId,
            address makerAddress,  
            address takerAddress,
            uint256 makerWager,
            uint256 takerWager,
            uint256 payout,
            uint256 timestamp,
            string memory makerTeamToWin,
            string memory takerTeamToWin,
            string memory matchId,
            address payable winner
        ) public onlyAgent {
        require(makerWager <= unlockedDeposits[makerAddress]);
        require(takerWager <= unlockedDeposits[takerAddress]);
        require(payout <= (makerWager + takerWager));

        unlockedDeposits[makerAddress] = unlockedDeposits[makerAddress] - makerWager;
        lockedDeposits[makerAddress] = lockedDeposits[makerAddress] + makerWager;

        unlockedDeposits[takerAddress] = unlockedDeposits[takerAddress] - takerWager;
        lockedDeposits[takerAddress] = lockedDeposits[takerAddress] + takerWager;

        fills.push(
            Fill
            (
                fillId,
                makerAddress, 
                takerAddress,
                makerWager, 
                takerWager, 
                payout, 
                timestamp, 
                makerTeamToWin, 
                takerTeamToWin,
                matchId, 
                winner
            )
        );
        fillsLength++;
    }

    function checkForWinners() public onlyAgent {
        uint256 i=0;
        for (; i < fillsLength - 1; i++) {  
            if (fills[i].winner != address(0)) {
                Fill memory fill = fills[i];
                transferWinner(            
                        fill.fillId,
                        fill.makerAddress, 
                        fill.takerAddress, 
                        fill.makerWager, 
                        fill.takerWager,
                        fill.payout,
                        fill.winner
                    );
            }      
        }
    }

    function transferWinner(
            uint256 fillId,
            address makerAddress, 
            address takerAddress, 
            uint256 makerWager, 
            uint256 takerWager,
            uint256 payout,
            address payable winner
        ) public onlyAgent {
        require(lockedDeposits[makerAddress] >= makerWager);
        require(lockedDeposits[takerAddress] >= takerWager);
        lockedDeposits[makerAddress] = lockedDeposits[makerAddress] - makerWager;
        lockedDeposits[takerAddress] = lockedDeposits[takerAddress] - takerWager;
        winner.transfer(payout);

        uint256 i=0;
        for (; i < fillsLength - 1; i++) {  
            if (fills[i].fillId == fillId) {
                delete fills[i];
                fillsLength--;
            }      
        }
    }
}