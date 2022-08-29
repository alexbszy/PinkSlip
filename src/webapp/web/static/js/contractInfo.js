ADDRESS = "0x524680080e7Dc0844E1948e6E4dd386C80025Dd3";
ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fillId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "makerAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "takerAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "makerWager",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "takerWager",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "payout",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "makerTeamToWin",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "takerTeamToWin",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "matchId",
          "type": "string"
        },
        {
          "internalType": "address payable",
          "name": "winner",
          "type": "address"
        }
      ],
      "name": "addFill",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "checkForWinners",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "desposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "fills",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "fillId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "makerAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "takerAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "makerWager",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "takerWager",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "payout",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "makerTeamToWin",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "takerTeamToWin",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "matchId",
          "type": "string"
        },
        {
          "internalType": "address payable",
          "name": "winner",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fillsLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "lockedDeposits",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fillId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "makerAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "takerAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "makerWager",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "takerWager",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "payout",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "winner",
          "type": "address"
        }
      ],
      "name": "transferWinner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "unlockedDeposits",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawUnlocked",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]