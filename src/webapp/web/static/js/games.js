let betData;
let CURRENT_TIME = new Date().valueOf();
let tables = [];


window.onresize = function(event) {
    tables.forEach((table) => {
        renderTableWidth(table.id, table.homeTable, table.awayTable);
    })
};

function displayGames() {
    clearOutAllLists();
    clearOutHeaders();
    
    const currentData = betData[currentIndex];
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

        const matchName = formatMatch(dataDto.away_team_name, 
            dataDto.home_team_name, dataDto.status);
        matchNameToMatchId.set(matchName, dataDto.id);
        matchIdToMatchName.set(dataDto.id, matchName);
        
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
        const hasGameCommenced = commenceTime <= CURRENT_TIME;
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
allBets.forEach((bet) => {
    $(`#${bet.matchId} .five`).text(`No. Entries: ${(0).toString()}`)
})

allBets.forEach((bet) => {
    if(bet.status === "open") {
        $(`#${bet.matchId} .five`).text(`No. Entries: ${(parseInt($(`#${bet.matchId} .five`).text().substring(13))+1).toString()}`)
    }
})
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
        $('#contain').append(`<h2 class="header">${header}</h2>`);
        $('#contain').append(`<ol class=${listName}></ol>`);
    }
}

function createEmptyList(listName, header) {
    if (!$(`ol.${listName}`).length) {
        $('#contain').append(`<h2 class="header">${header}</h2>`);
        $('#contain').append(`<ol class=${listName}></ol>`);
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
    $(d).append(`<div class=five>No. Entries: ${0}</div>`);
    $(d).append(`<div class=four>${UP_ARROW};</div>`)
    $(`.${listName}`).append(d);
}

function dropDownOnId(id) {
    console.log(id.id);
    if ($(`#${id.id}`)[0].lastChild.className === "openBetBar") {
        if ($(`#${id.id}`)[0].lastChild.getAttribute("mode") === "up") {
            $(`#${id.id} .openBetBar`).slideDown("fast", () => {
                $(`#${id.id} .openBetBar`)[0].setAttribute("mode", "down");
                $(`#${id.id} .four`)[0].innerHTML=DOWN_ARROW
                $(`#${id.id} .four`).css('color', 'grey');
            });
        } else {
            $(`#${id.id}`).find(".openBetBar").slideUp("fast", () => {
                $(`#${id.id} .openBetBar`)[0].setAttribute("mode", "up");
                $(`#${id.id} .four`)[0].innerHTML=UP_ARROW
                $(`#${id.id} .four`).css('color', 'white');
            });
        }
    } else {

        $(`#${id.id}`).append(`<div style="display: none;" class="openBetBar">${getOrderHTML(id.id)}</div>`)
        const homeTable = createTable(id.id, true);
        const awayTable = createTable(id.id, false);
        tables.push({"id": id.id, "homeTable": homeTable, "awayTable": awayTable});
        homeTable?.render();

        $(`#${id.id} .openBetBar`).slideDown("fast", () => {
            $(`#${id.id} .openBetBar`)[0].setAttribute("mode", "down");
            $(`#${id.id} .four`)[0].innerHTML=DOWN_ARROW
            $(`#${id.id} .four`).css('color', 'grey');

            renderTableWidth(id.id, homeTable, awayTable);

            let height = $(`#homeTable${id.id} .htCore`).height();
            const awayTableHeight = $(`#awayTable${id.id} .htCore`).height();
            if (awayTableHeight > height) {
                height = awayTableHeight;
            }
            height += $(`#${id.id} #homeTitle`).height();
            height += $(`#${id.id} #homeTitle`).height();
            $(`#${id.id} .openBetBar`).height(height);

        });

    }
}

function renderTableWidth(id, homeTable, awayTable) {
    const wid = $(`#${id} #home`).width();
    const colWidths = [wid*.35, wid*.25, wid*.1, wid*.1, wid*.1, wid*.1];
    homeTable?.updateSettings({
        colWidths: colWidths
    });
    awayTable?.updateSettings({
        colWidths: colWidths
    });
    awayTable?.render();
    homeTable?.render();

}

function getOrderHTML(id) {
    
    // allOpenBets.forEach((bet) => {
    //     if (bet.matchId === id) { 

    //     }
    // }

      // <div>
        //     <div id="away"></div>
        //     <div id="awayTitle">Away</div>
        // </div>


        // <div id="awayHolder">
        // <div id="awayTable"></div>
        

    const homeTeam = $(`#${id} .one .block`)[1].innerHTML
    const awayTeam = $(`#${id} .one .block`)[0].innerHTML
    let html = `
    <div id="matchTable">
        <div id="titleHolder">
            <div id="away"></div>
            <div id="awayTitle"><b>${awayTeam} To Win</b></div>
        </div>
        <div>
            <div id="home"></div>
            <div id="homeTitle"><b>${homeTeam} To Win</b></div>
        </div>
        <div id="awayHolder">
            <div id="awayTable${id}"></div>
        </div>
        <div id="homeHolder">
            <div id="homeTable${id}"></div>
        </div>
    </div>`;
    // allOpenBets.forEach((bet) => {
    //     if (bet.matchId === id) {
    //         const duration = bet.duration;
    //         const toWager = Number.parseFloat(bet.toWager);
    //         const toWin = Number.parseFloat(bet.toWin);
    //         if (bet.walletAddress === walletAddress) {
    //             html += `<div class="users">${duration} - ${toWager} - ${toWin}</div>`
    //         } else {
    //             html += `<div class="others">${duration} - ${toWager} - ${toWin}</div>`
    //         }
    //         console.log(html);
    //     }
    // })
    return html;
}

function convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

// function buttonRender(instance, td, row, col, prop, value, cellProperties) {
//     console.log(td);
//     return `<button>ss</button>`
// }
async function askTransaction(betWalletAddress, toWin, toWager, orderId, match, matchId, league, user, homeTeam, awayTeam, isHome) {
    console.log(user);
    if (user === "User Bet") {
        Modal.alert("You can not bet against yourself.");
        return;
    }
    if (walletAddress === "0x0000000000000000000000000000000000000000") {
        Modal.alert("Connect a wallet to place a bet.");
        return;
    }

    let makerTeamToWin = homeTeam;
    let takerTeamToWin = awayTeam;

    if (isHome) {
        makerTeamToWin = awayTeam;
        takerTeamToWin = homeTeam;
    }
    const timestamp = new Date().valueOf();
    const fillDto = 
    {
        "fillId": randomNumber(12),
        "maker": betWalletAddress,
        "taker": walletAddress,
        "makerWager": toWager,
        "takerWager": (toWin - toWager).toString(),
        "payout": toWin,
        "timestamp": timestamp,
        "makerTeamToWin": makerTeamToWin,
        "takerTeamToWin": takerTeamToWin,
        "makerBetId": orderId
    }

    const order = {
        "status": "pending",
        "walletAddress": walletAddress,
        "orderId": randomNumber(12),
        "timestamp": timestamp,
        // expiry
        "league": league,
        "match": match,
        "matchId": matchId,
        "side": takerTeamToWin,
        // duration
        "toWager": (toWin - toWager).toString(),
        "toWin": toWin,
    }

    await sendTransaction(toWin - toWager);

    console.log(JSON.stringify({"type":"addOrder","data":order}))
    socket.send(JSON.stringify({"type":"addOrder","data":order}));

    console.log(JSON.stringify({"type":"fill","data":fillDto}));
    socket.send(JSON.stringify({"type":"fill","data":fillDto}));
}

function createTable(id, isHomeTable) {
    const homeTeam = $(`#${id} .one .block`)[1].innerHTML;
    const awayTeam = $(`#${id} .one .block`)[0].innerHTML;

    console.log(homeTeam, awayTeam)
    const tableData = [];
      
    allBets.forEach((bet) => {
        if (bet.matchId === id && bet.status == "open") {
            if (isHomeTable && bet.side === awayTeam || !isHomeTable && bet.side === homeTeam) {
                console.log(bet.side);
                const expiry = bet.expiry;
                const toWager = Number.parseFloat(bet.toWager);
                const toWin = Number.parseFloat(bet.toWin);
                let user = "User Bet"
                if (bet.walletAddress !== walletAddress) {
                    user = "Anonymous " + getRandomAnimal();
                } 
                tableData.push([user, expiry, toWin-toWager, toWin, (toWin-toWager)/toWin, 
                `<button onclick="askTransaction('${bet.walletAddress}', '${bet.toWin}', '${bet.toWager}', 
                '${bet.orderId}', '${bet.match}', '${bet.matchId}', '${bet.league}', '${user}', '${homeTeam}', '${awayTeam}', '${isHomeTable}')" class='betButton'>Bet</button>`])
            }
        }
    })

    // if (!tableData.length) {
    //     return undefined;
    // }

    let elementId = 'awayTable' + id;
    if (isHomeTable) {
        elementId = 'homeTable' + id;
    }
    const wid = ($(`#${id}`).width() - convertRemToPixels(2)) / 2;
    console.log(`width ${wid}`)
    const hot = new Handsontable(document.getElementById(elementId), {
        rowHeaders: false,
        colHeaders: ['Opponent', 'Expires At', 'Wager', 'Payout', 'Odds', ''],
        columns: [
            {type: 'text', editor: false, readOnly: true}, 
            {type: 'time', timeFormat: 'MM/DD/YYYY hh:mm A', correctFormat: true,editor: false, readOnly: true},
            {type: 'numeric', editor: false, readOnly: true},
            {type: 'numeric', editor: false, readOnly: true},
            {type: 'numeric',  numericFormat: {pattern: '%0,0.00'}, editor: false, readOnly: true },
            {type: 'text', renderer: "html", editor: false, readOnly: true}, //renderer: buttonRender},
        ],
        data: tableData,
        dropdownMenu: true,
        // filters: true,
        renderAllRows: true,

        sorting: true,
        // manualColumnResize: true,
        // width: '100%',
        selectionMode: 'single', // 'single', 'range' or 'multiple',
        colWidths: [wid*.35, wid*.25, wid*.1, wid*.1, wid*.1, wid*.1],
        // colWidths: 25,
        // width: '100%',
        // stretchH: 'all', // 'none' is default
        licenseKey: 'non-commercial-and-evaluation',
        columnSorting: {
            initialConfig: {
                column: 4,
                sortOrder: 'asc'
            }
        },
        onSelection: function (r, c, r2, c2) {
            $(`#${elementId}`).handsontable('deselectCell');
        }, 

      });
      hot.validateCells();

      return hot;
}

