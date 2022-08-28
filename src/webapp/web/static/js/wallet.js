walletAddress = "0x0000000000000000000000000000000000000000";
walletBalance = "0";


async function formatBalance() {
    const wei = await web3.eth.getBalance(walletAddress);
    const ethBalance =  web3.utils.fromWei(wei , 'ether');
    walletBalance = ethBalance;
    return Number.parseFloat(ethBalance).toFixed(2) + " RopEth";
}

function formatAddress() {
    return walletAddress.substring(0,6) + '...' + walletAddress.substr(walletAddress.length - 5, 4)
}

async function connectWallet() {
    connectToMetaMask().then(async (hasConnected) => {
        if (hasConnected) {
        const toSend = 
        {
            "type": "walletConnected",
            "walletAddress": walletAddress
        };
        console.log(toSend);


        socket.send(JSON.stringify(toSend));
        
        }
    }).then(async () => {
        const balance = await formatBalance();
        $("#connect").hide();
        if (!$("#topRightBalance").length) {
            $("#topRight").append(`<button id="topRightBalance">${formatAddress()} ${balance}</button>`);
        }
    });
}

/* To connect using MetaMask */
async function connectToMetaMask() { 
    if (window.ethereum) {    
        await window.ethereum.request({ method: "eth_requestAccounts" });
        window.web3 = new Web3(window.ethereum);    
        const account = web3.eth.accounts;     //Get the current MetaMask selected/active wallet
        walletAddress = account.givenProvider.selectedAddress;    
        console.log(`Wallet: ${walletAddress}`);
        return true;
    } else {
        alert("No wallet found"); 
        return false;
    }
}
   