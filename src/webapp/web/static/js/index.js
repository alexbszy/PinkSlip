let socket;
let betData;
let currentIndex = 0;
const UP_ARROW = "&#813";
const DOWN_ARROW = "&#748";
let pinkSlipState = 1;

const listOfSports = ['Live', 'NCAAF', 'NFL', 'MLB', 'NBA', 'NCAAB', 'NHL', 'EPL', 'Bundesliga', 'La Liga'];
const listOfSportImages = ['all.png', 'football.png', 'football.png', 'baseball.png', 'basketball.png', 'basketball.png', 'hockey.png', 'soccer.png', 'soccer.png', 'soccer.png'];

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

function setUrlParam() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(listOfSports[currentIndex], "");
    window.location.hash = urlParams.toString().slice(0,-1);
}


function setIndexFromParam() {
    let key = window.location.hash;
    if (key !== "") {
        key = key.slice(1).replace('+', ' ');
        paramIndex = listOfSports.indexOf(key);
        if (paramIndex !== -1) {
            currentIndex = paramIndex;
        }
    }
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
        displayCollection();
     }
});


function requestCollection() { 
    socket.send("all");
    $('button').prop("disabled", true);
}

function displayCollection() {

    clearOutAllLists();
    clearOutHeaders();

    const currentData = betData[currentIndex];
    // $(".tile2").eq(currentIndex).css("border-color", "white");
    console.log(currentData)

    if (JSON.stringify(currentData) === `[]`) {
        createEmptyList("upcoming_list", "");
   } else {
    currentData.forEach((bet) => {
        let dataDto = {
            "id": bet.id,
            "away_team_name": bet.away_team,
            "home_team_name": bet.home_team,
            "away_team_score": "-",
            "home_team_score": "-",
            "status": bet.commence_time
        }

        if (bet.scores) {
            bet.scores.forEach((score) => {
                if (score.name === dataDto["away_team_name"]) {
                    dataDto["away_team_score"] = score.score;
                } else if (score.name === dataDto["home_team_name"]) {
                    dataDto["home_team_score"] = score.score;
                }
            });
        }
        createList("live_list", "Live Games");
        createList("upcoming_list", "Upcoming Games");
        createList("completed_list", "Completed Games");

        const commenceTime = Date.parse(dataDto["status"]);
        const hasGameCommenced = commenceTime <= new Date().valueOf();
        dataDto["status"] = getFormattedDate(new Date(commenceTime));
        
        if (hasGameCommenced && !bet.completed) {
            dataDto["status"] = "Live";
            appendToList(dataDto, "live_list");
        } else if (!hasGameCommenced && !bet.completed) {
            appendToList(dataDto, "upcoming_list");
        } 
        else {
            dataDto["status"] = "Completed";
            appendToList(dataDto, "completed_list");
        }
    });

    if (!$("ol.live_list li").length) {
        appendEmptyToList("live_list", "No live games", "");
    }
    if (!$("ol.upcoming_list li").length) {
        appendEmptyToList("upcoming_list", "No upcoming games", "");
    }
    if (!$("ol.completed_list li").length) {
        appendEmptyToList("completed_list", "No recently completed games", "");
    }
}
}


function createPinkSlip() {
    const html = 
    '<div class="pink-slip">' 
        + '<div class="pink-slip-header">' 
            + `<div class="pink-slip-header-1" onclick=switchPinkSlipContent(1)>${"BET SLIP"}</div>`
            + `<div class="pink-slip-header-2" onclick=switchPinkSlipContent(2)>${"OPEN BETS"}</div>`
            + `<div class="pink-slip-header-3" onclick=switchPinkSlipContent(3)>${UP_ARROW}</div>`
        + `</div>` 
        + '<div class="pink-slip-body">' 
            + `<div class="pink-slip-body-content-1">`
                + `<div class="pink-slip-body-content-text-1" onclick=switchPinkSlipContent(4)>${"Place A Bet"}</div>`
            + `</div>`
            + `<div class="pink-slip-body-content-2">`
                + `<div class="pink-slip-body-content-text-2">${"No Open Bets"}</div>`
            + `</div>`
        + '</div>' 
    + '</div>';
    $('body').append(html);
}
function switchPinkSlipContent(state) {
    switch(state) {
        case 1:
            $(".pink-slip-header-1").css('border-bottom', '0rem solid black');
            $(".pink-slip-header-2").css('border-bottom', '.0125rem solid black');
            $(".pink-slip-header-3").css('border-bottom', '.0125rem solid black');
            if (pinkSlipState > 10) {
                $(".pink-slip-body-content-1").slideDown('fast');
            } else {
                $(".pink-slip-body-content-1").css('display', 'block');
                $(".pink-slip-body-content-2").css('display', 'none');
            }
            $(".pink-slip-header-3")[0].innerHTML = UP_ARROW;
            pinkSlipState = 1;
            break;
        case 2:
            $(".pink-slip-header-1").css('border-bottom', '.0125rem solid black');
            $(".pink-slip-header-2").css('border-bottom', '0rem solid black');
            $(".pink-slip-header-3").css('border-bottom', '.0125rem solid black');
            if (pinkSlipState > 10) {
                $(".pink-slip-body-content-2").slideDown('fast');
            } else {
                $(".pink-slip-body-content-1").css('display', 'none');
                $(".pink-slip-body-content-2").css('display', 'block');
            }
            $(".pink-slip-header-3")[0].innerHTML = UP_ARROW;
            pinkSlipState = 2;
            break;
        case 3:
            if (pinkSlipState === 1 || pinkSlipState === 2) {
                $(".pink-slip-body-content-1").slideUp("fast");
                $(".pink-slip-body-content-2").slideUp('fast');
                $(".pink-slip-header-1").css('border-bottom', '0rem solid black');
                $(".pink-slip-header-2").css('border-bottom', '0rem solid black');
                $(".pink-slip-header-3").css('border-bottom', '0rem solid black');
                $(".pink-slip-header-3")[0].innerHTML = DOWN_ARROW;
                pinkSlipState = parseInt('1' + pinkSlipState)
            } else if (pinkSlipState === 11) {
                pinkSlipState = 1;
                $(".pink-slip-header-1").css('border-bottom', '0rem solid black');
                $(".pink-slip-header-2").css('border-bottom', '.0125rem solid black');
                $(".pink-slip-header-3").css('border-bottom', '.0125rem solid black');
                $(".pink-slip-body-content-1").slideDown('fast');
                $(".pink-slip-header-3")[0].innerHTML = UP_ARROW;
           } else if (pinkSlipState === 12) {
                pinkSlipState = 2;
                $(".pink-slip-header-1").css('border-bottom', '.0125rem solid black');
                $(".pink-slip-header-2").css('border-bottom', '0rem solid black');
                $(".pink-slip-header-3").css('border-bottom', '.0125rem solid black');
                $(".pink-slip-body-content-2").slideDown('fast');
                $(".pink-slip-header-3")[0].innerHTML = UP_ARROW;
            }
           break;
           case 4:
            console.log("placing bet");
        default:
          // code block
      }
      console.log(pinkSlipState);

}

function clearOutAllLists() {
    clearOutList("live_list");
    clearOutList("upcoming_list");
    clearOutList("completed_list");
}

function clearOutList(listName) {
    if ($(`ol.${listName}`).length) {
        $(`ol.${listName}`).empty();        
        $(`ol.${listName}`).remove();
    }
}

function clearOutHeaders() {
    if ($("h2.header").length) {
        $("h2.header").remove();   
    }
}

function createList(listName, header) {
    if (!$(`ol.${listName}`).length) {
        $('body').append(`<h2 class="header">${header}</h2>`);
        $('body').append(`<ol class=${listName}></ol>`);
    }
}

function createEmptyList(listName, header) {
    if (!$(`ol.${listName}`).length) {
        $('body').append(`<h2 class="header">${header}</h2>`);
        $('body').append(`<ol class=${listName}></ol>`);
        d = document.createElement('li');
        $(d).addClass("tile_empty");
        $(d).append(`<div class=one><div class=block>${"No games in the near future"}</div><div class=block>${"Please check back later"}</div></div>`)
        $(`.${listName}`).append(d);
    }
}

function appendEmptyToList(listName, messageOne, messageTwo) {
    d = document.createElement('li');
    $(d).addClass("tile_empty");
    $(d).append(`<div class=one><div class=block>${messageOne}</div><div class=block>${messageTwo}</div></div>`)
    $(`.${listName}`).append(d);
}

function appendToList(dataDto, listName) {
    d = document.createElement('li')
    const key = "_" + dataDto["id"];
    d.setAttribute("id", key);
    d.setAttribute("onclick", `dropDownOnId(${key})`)
    $(d).addClass("tile");
    $(d).append(`<div class=one><div class=block>${dataDto["away_team_name"]}</div><div class=block>${dataDto["home_team_name"]}</div></div>`)
    $(d).append(`<div class=three><div>${dataDto["away_team_score"]}</div><div>${dataDto["home_team_score"]}</div></div>`)
    $(d).append(`<div class=two>${dataDto["status"]}</div>`);
    $(d).append(`<div class=three>No. Entries:<br>${0}</div>`);
    $(d).append(`<div class=four>${UP_ARROW};</div>`)
    $(`.${listName}`).append(d);
}

function setIndex(index) {
    currentIndex = index;
    console.log("index is now", currentIndex);
    displayCollection();
    setUrlParam();

}

function requestNew(index) {
    console.log("requestNew");
    socket.send("hi");
}

function dropDownOnId(id) {
    if ($(`#${id.id}`)[0].lastChild.className === "testt") {
        if ($(`#${id.id}`)[0].lastChild.getAttribute("mode") === "up") {
            $(`#${id.id}`).find(".testt").slideDown("fast");
            $(`#${id.id}`).find(".testt")[0].setAttribute("mode", "down");
            $(`#${id.id}`).find(".four")[0].innerHTML=DOWN_ARROW
            $(`#${id.id}`).find(".four").css('color', 'grey');
        } else {
            $(`#${id.id}`).find(".testt").slideUp("fast");
            $(`#${id.id}`).find(".testt")[0].setAttribute("mode", "up");
            $(`#${id.id}`).find(".four")[0].innerHTML=UP_ARROW
            $(`#${id.id}`).find(".four").css('color', 'white');
        }
    } else {
        $(`#${id.id}`).append('<div style="display: none;" class="testt">SOMETHING</div>')
        $(`#${id.id}`).find(".testt").slideDown("fast");
        $(`#${id.id}`).find(".testt")[0].setAttribute("mode", "down");
        $(`#${id.id}`).find(".four")[0].innerHTML=DOWN_ARROW
        $(`#${id.id}`).find(".four").css('color', 'grey');
    }
}
