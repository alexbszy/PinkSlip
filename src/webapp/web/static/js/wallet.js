walletAddress = "0x0000000000000000000000000000000000000000";
walletBalance = "0";

async function formatBalance() {
    const wei = await web3.eth.getBalance(walletAddress);
    const ethBalance =  web3.utils.fromWei(wei , 'ether');
    walletBalance = ethBalance;
    return Number.parseFloat(ethBalance).toFixed(2) + " Eth";
}

function formatAddress() {
    return walletAddress.substring(0,6) + '...' + walletAddress.substr(walletAddress.length - 5, 4)
}

async function connectWallet() {
    const toConnect = await connectToMetaMask();
    if (toConnect) {
        const toSend = 
        {
            "type": "walletConnected",
            "walletAddress": walletAddress
        };
        console.log(toSend);
        socket.send(JSON.stringify(toSend));
        
        const balance = await formatBalance();
        $("#connect").hide();
        if (!$("#topRightBalance").length) {
            $("#topRight").append(`<button id="topRightBalance">${formatAddress()} ${balance}</button>`);
        }
    }
}

/* To connect using MetaMask */
async function connectToMetaMask() { 
    if (window.ethereum) {    
        await window.ethereum.request({ method: "eth_requestAccounts" });
        window.web3 = new Web3(window.ethereum);    
        const account = web3.eth.accounts;     //Get the current MetaMask selected/active wallet

        if (window.ethereum.networkVersion != 5) {
            Modal.alert("Current implementation uses Goerli test net. Switch networks to bet."); 
            return false;
        }
        walletAddress = account.givenProvider.selectedAddress;    
        console.log(`Wallet: ${walletAddress}`);
        return true;
    } else {
        Modal.alert("No wallet found. You will not be able to place bets until connecting a wallet."); 
        return false;
    }
}

async function sendTransaction(depositValue) {
    const contractInstance = new web3.eth.Contract(ABI, ADDRESS);
    depositValue *= 1000000000000000000;
    let hash;
    await contractInstance.methods.desposit().send({ from: walletAddress, value: 0, gas: 3000000 },
    (err, res) => { hash = res;}
    );
    await web3.eth.getTransactionReceipt(hash);
   
}

async function withdrawTransaction(withdrawValue) {
    const contractInstance = new web3.eth.Contract(ABI, ADDRESS);
    withdrawValue *= 1000000000000000000;
    let hash;

    await contractInstance.methods.withdrawUnlocked(withdrawValue).send({ from: walletAddress, value: 0, gas: 3000000 },
    (err, res) => { hash = res; }
    );
    await web3.eth.getTransactionReceipt(hash);
}