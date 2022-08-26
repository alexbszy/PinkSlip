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
    socket = new WebSocket("ws://18.116.82.31:8080/");
    // socket = new WebSocket("wss://127.0.0.1:8443/");

    // setUrlParam();
    setIndexFromParam();
    setUrlParam();
    $('body').append('<div class="topRow"><h1 id="mainTitle">PinkSlip.io</h1><button id="connect" onclick="connectWallet()">Connect Wallet</button></div>');
    $('body').append('<div class="headers"></div>');
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
    if (event.type === "walletOpenOrders") {
        setOpenOrders(event.data);
    } 
    if (event.type === "addOrder") {
        addOrderSuccess(event.data);
    } 
    if (event.type === "removeOrder") {
        removeOrderSuccess(event.data.orderId);
    } 
}