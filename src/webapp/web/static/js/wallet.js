walletAddress = "0x0000000000000000000000000000000000000000";

async function connectWallet() {
    connectToMetaMask().then((hasConnected) => {
        if (hasConnected) {
        const toSend = 
        {
            "type": "walletConnected",
            "walletAddress": walletAddress
        };
        console.log(toSend);
        socket.send(JSON.stringify(toSend));
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
   