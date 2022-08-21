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
    socket = new WebSocket("ws://18.116.82.31:3000/");
    // setUrlParam();
    setIndexFromParam();
    setUrlParam();
    $('body').append('<h1>PinkSlip.io</h1>');
    $('body').append('<div class="headers"></div>');
    setUpTabs();
    createPinkSlip();
    socket.onmessage = function(event){
        console.log(event);
        betData = JSON.parse(event.data)
        displayGames();
     }
});
