let socket;

function setUpTabs() {
    listOfSports.forEach((sport, index) => {
        const html = 
        `<div class=tile2 onclick="setIndex(${index})">`
            + `<div class=wrapper>`
                + `<div class=title>${sport}</div>`
            + `</div>`
            + `<div class=card>`
                + `<img class=img src="/img/${listOfSportImages[index]}"></img>`
            + `</card>`
        + `</div>`;
        $(".headers").append(html);
    })
}


function requestCollection() { 
    socket.send("all");
    $('button').prop("disabled", true);
}

$(() => { 
    socket = new WebSocket("wss://pinkslipbets.com:8443/");
    // socket = new WebSocket("ws://127.0.0.1:8443/");

    // setUrlParam();
    setIndexFromParam();
    setUrlParam();
    $('#contain').append('<div class="topRow"><h1 id="mainTitle">PinkSlipBets</h1><div id="topRight"><button id="connect" onclick="connectWallet()">Connect Wallet</button></div></div>');
    $('#contain').append('<div class="headers"></div>');
    setUpTabs();
    createPinkSlip();
    socket.onmessage = function(event){
        handleMessage(JSON.parse(event.data));

     }
});

function handleMessage(event) {
    console.log(event);
    if (event.type === "scores") {
        betData = event.data;
        displayGames();
    }
    if (event.type === "walletConnected") {
        walletConnected();
    } 
    if (event.type === "addOrder") {
        addOrderSuccess(event.data);
    } 
    if (event.type === "fill") {
        Modal.alert(`A bet has been made. Payout will be awarded once a winner is determined. [${event.data.fillId}]`)
    } 
    if (event.type === "removeOrder") {
        removeOrderSuccess(event.data.orderId);
    } 

    if (event.type === "allOrders") {
        allBets = event.data;
        allBets.forEach((bet) => {
            console.log(bet)
            // const currentNumber = $(`#${bet.matchId} .five`).text().substring(13);;
            // console.log(`asd =${currentNumber}`)
            // $(`#${bet.matchId} .five`).text(`No. Entries: ${(parseInt(currentNumber)+1).toString()}`)
        })
        displayGames();
    }

}

