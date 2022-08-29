let pinkSlipState = 1;

function createPinkSlip() {
    const html = 
    '<div class="pink-slip">' 
        + '<div class="pink-slip-header">' 
            + `<div class="pink-slip-header-1" onclick=switchPinkSlipContent(1)>${"BET SLIP"}</div>`
            + `<div class="pink-slip-header-2" onclick=switchPinkSlipContent(2)>${"MY BETS"}</div>`
            + `<div class="pink-slip-header-3" onclick=switchPinkSlipContent(3)>${UP_ARROW}</div>`
        + `</div>` 
        + '<div class="pink-slip-body">' 
            + `<div class="pink-slip-body-content-1">`
                + `<div class="pink-slip-body-content-text-1" onclick=connectWallet()>${"Connect Wallet To Bet"}</div>`
            + `</div>`
            + `<div class="pink-slip-body-content-2">`
                + `<div class="pink-slip-body-content-text-2">${"No Bets"}</div>`
            + `</div>`
        + '</div>' 
    + '</div>';
    $('#contain').append(html);
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
                $(".pink-slip-body-content-1").css('display', 'grid');
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
               if ($(".pink-slip-body-content-text-1")[0].innerHTML === 'Create A Bet') {
                    // $(".pink-slip-body-content-text-1")[0].innerHTML = 'Place A Bet';
                    // $(".pink-slip-body-content-1").html(`<div class="pink-slip-body-content-text-1" onclick=switchPinkSlipContent(4)>${"Place A Bet"}</div>`);
                    //$("#con-2").remove();

                } else {
                    $(".pink-slip-body-content-text-1")[0].innerHTML = 'Create A Bet';
                    $(".pink-slip-body-content-text-1").css("color", "black");

                    createSportDropDown($(".pink-slip-body-content-1"));
                    createMatchDropDown($(".pink-slip-body-content-1"));
                    createSideDropDown($(".pink-slip-body-content-1"));
                    createDurationDropDown($(".pink-slip-body-content-1"));
                    createToWagerDropDown($(".pink-slip-body-content-1"));
                    createToWinDropDown($(".pink-slip-body-content-1"));
                    // createAllowPartialFillsDropDown($(".pink-slip-body-content-1"));
                    createSubmitButton($(".pink-slip-body-content-1"));
                    $(".pink-slip-body-content-2").append('<div id="con-2"></div>');
                    console.log("placing bet");
               }
            break;
        default:
          // code block
      }
      console.log(pinkSlipState);
}

const optionsHtml = () => {
    let stringBuilder = `<option value=0>---</option>`;

    listOfSports.forEach((sport, index) => {
        console.log(sport, index+1);
        stringBuilder += `<option value=${index+1}>${sport}</option>`
    })
    return stringBuilder;
}

function createSportDropDown(elementToAppendTo) {
    const prompt = "League:";

    console.log(optionsHtml());
    const html = 
    `<div class="pink-slip-row">`
    + `<label>${prompt}</label>`
    + `<select id="league" onchange="setLeague(this.selectedIndex);">`
    + optionsHtml()
    + `</select>`
    + `</div>`;
    elementToAppendTo.append(html);
}

function createMatchDropDown(elementToAppendTo) {
    const prompt = "Match:";
    
    const optionsHtml = () => {
        let stringBuilder = `<option value=0>---</option>`;
        
        betData.forEach((bet) => {
            console.log(bet);
        })
        listOfSports.forEach((sport, index) => {
            console.log(sport, index+1);
            stringBuilder += `<option value=${index+1}>${sport}</option>`
        })
        return stringBuilder;
    }
    console.log(optionsHtml());

    const html = 
    `<div class="pink-slip-row">`
    + `<label>${prompt}</label>`
    + `<select id="match" onchange="setMatch(this.selectedIndex);">`
    + `<option value=0>---</option>`
      + `</select>`
      + `</div>`;
    elementToAppendTo.append(html);
}

function createSideDropDown(elementToAppendTo) {
    const prompt = "Team:";
    const html = 
    `<div class="pink-slip-row">`
    + `<label>${prompt}</label>`
    + `<select id="side">`
    + `<option value=0>---</option>`
      + `</select>`
      + `</div>`;    
      elementToAppendTo.append(html);
}

function createDurationDropDown(elementToAppendTo) {
    const prompt = "Duration:";
    const html = 
    `<div class="pink-slip-row">`
    + `<label>${prompt}</label>`
    + `<select id="duration">`
    + `<option value=0>---</option>`
      + `</select>`
      + `</div>`;    
      elementToAppendTo.append(html);
}

function createToWagerDropDown(elementToAppendTo) {
    const prompt = "To Wager:";
    const html = 
    `<div class="pink-slip-row">`
    + `<label>${prompt}</label>`
    + `<input type="number"  id="toWager">${""}</input>`
    + `</div>`;
    elementToAppendTo.append(html);
}

function createToWinDropDown(elementToAppendTo) {
    const prompt = "To Win:";
    const html = 
    `<div class="pink-slip-row">`
    + `<label>${prompt}</label>`
    + `<input type="number"  id="toWin">${""}</input>`
    + `</div>`;
    elementToAppendTo.append(html);
}


function createAllowPartialFillsDropDown(elementToAppendTo) {
    const prompt = "Allow Partial Fills:";
    const html = 
    `<div class="pink-slip-row">`
    + `<label>${prompt}</label>`
    + `<input type="checkbox" id="allowParitalFills" disabled></input>`
    + `</div>`;
    elementToAppendTo.append(html);
}

function createSubmitButton(elementToAppendTo) {
    const prompt = "Allow Partial Fills:";
    const html = 
    `<div class="pink-slip-row-button">`
    + `<button onclick=placeOrder()>Submit</button>`
    + `</div>`;
    elementToAppendTo.append(html);
}

function setLeague(betIndex) {
    $('#match').find('option').remove().end().append('<option value=0>---</option>').val(0);
    $('#side').find('option').remove().end().append('<option value=0>---</option>').val(0);
    $('#duration').find('option').remove().end().append('<option value=0>---</option>').val(0);

    if (betIndex === 0) {
        return;
    }
    console.log(betData[betIndex]);
    betData[betIndex-1].forEach((jsonData, index) => {
        const commenceTime = Date.parse(jsonData.commence_time);
        const hasGameCommenced = commenceTime <= CURRENT_TIME;
        if (!jsonData.completed && !hasGameCommenced) {
            $('#match').append($('<option>', { 
                value: index+1,
                text : formatMatch(jsonData.away_team, jsonData.home_team, jsonData.commence_time)
            }));
        } else {
            $('#match').append($('<option hidden>', { 
                value: index+1,
                text : formatMatch(jsonData.away_team, jsonData.home_team, jsonData.commence_time)
            }));
        }
    });

    $("#league")[0].setAttribute("title", listOfSports[betIndex-1]);
}


function setMatch(betIndex) {
    $('#side').find('option').remove().end().append('<option value=0>---</option>').val(0);
    $('#duration').find('option').remove().end().append('<option value=0>---</option>').val(0);
    if (betIndex === 0) {
        return;
    }
    leagueIndex = $("#league").val();


    matchJson = betData[leagueIndex-1][betIndex-1];
    const teams = [matchJson.away_team, matchJson.home_team];
    teams.forEach((team, index) => {
        $('#side').append($('<option>', { 
            value: index+1,
            text : team
        }))
    })
    const commenceTime = Date.parse(matchJson.commence_time);
    const HOUR = 1*60*60*1000;
    const timeLeft = commenceTime - CURRENT_TIME;
    const durationTimes = ["1 hour", "4 hours", "8 hours", "1 day", "3 days", "1 week"];
    const durationTimesInSeconds = [HOUR, 4*HOUR, 8*HOUR, 24*HOUR, 72*HOUR, 168*HOUR];

    let i = 0;
    for (i; i < durationTimes.length; i++) {
        if (timeLeft > durationTimesInSeconds[i]) {
            $('#duration').append($('<option>', { 
                value: CURRENT_TIME + durationTimesInSeconds[i],
                text : durationTimes[i]
            }))
        } else {
            break;
        }
    }
    if (timeLeft > 0) {
        $('#duration').append($('<option>', { 
            value: commenceTime,
            text : "Until Match Begins"
        }))
    } 
    $("#match")[0].setAttribute("title", formatMatch(matchJson.away_team, matchJson.home_team, matchJson.commence_time));
}

function setTeam() {
    // To Do
}
function setDuration() {
    // To Do
}

function formatMatch(away_team, home_team, commence_time) {
    return away_team + " at " + home_team
             +  " (" + getFormattedDate(new Date(commence_time)) + ")"
}
async function placeOrder() {
    let message = "+";

    console.log($("#toWin").val());
    console.log($("#toWager").val());
    console.log($("#duration option:selected").val());

    console.log($("#duration option:selected").text());
    console.log($("#side option:selected").text());
    console.log($("#match option:selected").text());
    console.log($("#league option:selected").text());

    console.log($("#match").val());

    // Check to see if person has enough funds
    if ($("#toWin").val() === "" || $("#toWin").val() <= 0) {
        message = "Select a valid amount to win.";
    }
    if ($("#toWager").val() === "" || $("#toWager").val() <= 0) {
        message = "Select a valid wager.";
    }
    if (!parseInt($("#duration").val())) {
        message = "Select a valid duration.";
    }
    if (!parseInt($("#side").val())) {
        message = "Select a valid team.";
    }
    if (!parseInt($("#match").val())) {
        message = "Select a valid match.";
    }
    if (!parseInt($("#league").val())) {
        message = "Select a valid league.";
    }
    console.log("---");

    const matchId = '_' + betData[parseInt($("#league").val())-1][parseInt($("#match option:selected").val())-1]["id"];
    // console.log(message);
    if (message === "+") {
        const order = {
            "status": "open",
            "walletAddress": walletAddress,
            "orderId": randomNumber(12),
            "timestamp": Date.now(),
            "expiry": parseInt($("#duration option:selected").val()),
            "league": $("#league option:selected").text(),
            "match": $("#match option:selected").text(),
            "matchId": matchId,
            "side": $("#side option:selected").text(),
            "duration": $("#duration option:selected").text(),
            "toWager": $("#toWager").val(),
            "toWin": $("#toWin").val(),
            }

        await sendTransaction($("#toWager").val());
        socket.send(JSON.stringify({"type":"addOrder","data":order}));
        }
        else {
            Modal.alert(message);
        }

}
function filterStatus() {
    const status = $("#betStatus option:selected").val();
    if (!status) {
        return "all";
    }
    return status;
}

function formatOrders() {
    const filteredStatus = filterStatus();
    console.log(filteredStatus)
    console.log(filteredStatus)
    console.log(filteredStatus)

    let htmlBuilder = `<ol id="openBets"></ol>`;

    // const orderId = ['alex-1234', 'alex-1235', 'alex-145'];
    userBetsNumber = 0;
    allBets.forEach((bet) => {
        if (bet.walletAddress === walletAddress) {
            if ((filteredStatus === "all") || (bet.status === filteredStatus) || (filteredStatus === "settled" && (bet.status === "won" || bet.status === "lost"))) {
                userBetsNumber +=1
                let eventMatch = bet.match.substring(
                    0,
                    bet.match.indexOf("("), 
                ).split('_').join(' ');
                let eventTime = bet.match.substring(
                    bet.match.indexOf("(") + 1, 
                    bet.match.lastIndexOf(")")
                );
                let buttonHTML = ""
                if (bet.status == "open") {
                    buttonHTML = `<button id="cancel" onclick=removeOrder(${bet.orderId},${bet.toWager})>Cancel Bet</button>`
                }
                htmlBuilder += 
                `<li class="openBetRow">
                    <div class="openBetRow2">
                        <div><b>OrderId: &nbsp </b>${bet.orderId} </div>
                        <div class="placeholder"></div>
                        ${buttonHTML}
                    </div>
                    <div class="openBetRow2"><b>Status: &nbsp </b>${bet.status.toUpperCase()}</div>
                    <div class="openBetRow2"><b>Event: &nbsp </b>${eventMatch}</div>
                    <div class="openBetRow2"><b>Time: &nbsp </b>${eventTime}</div>
                    <div class="openBetRow2"><b>Side: &nbsp </b>${bet.side}</div>
                    <div class="openBetRow2"><b>Wager: &nbsp </b>${bet.toWager}</div>
                    <div class="openBetRow2"><b>To Win: &nbsp </b>${bet.toWin}</div>
                </li>`;
            }
        }
    })

    htmlBuilder += `</ol>`;
    if (userBetsNumber === 0) {
        htmlBuilder = `<div id="noBets">No Bets With Status ${filteredStatus.toUpperCase()}</div>`;
        if (filteredStatus === "all") {
            htmlBuilder = `<div id="noBets">No Bets</div>`;
        }
    }
    if ($(".pink-slip-body-content-text-2")[0].innerHTML === "No Bets") {
        $(".pink-slip-body-content-text-2")[0].innerHTML 
        =   `<select id="betStatus" onchange="formatOrders()">
                <option value="all">All Bets</option>
                <option value="open">Open Bets</option>
                <option value="pending">Pending Bets</option>
                <option value="settled">Settled</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
            </select>`
    } 
    $("#con-2")[0].innerHTML = htmlBuilder;
}

async function removeOrder(orderId, toWager) {
    await withdrawTransaction(toWager);
    const data = {"walletAddress": walletAddress, "orderId": orderId};
    socket.send(JSON.stringify({"type":"removeOrder","data":data}));
}


// https://github.com/mderazon/order-id/blob/master/lib/index.js
// This is less than ideal for order ids - TODO
function randomNumber(length) {
    return Math.floor(
      Math.pow(10, length - 1) +
        Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
    ).toString();
  }

  function addOrderSuccess(order) {
    console.log(order);
    $('#league').find('option').remove().end().append(optionsHtml());
    $('#match').find('option').remove().end().append('<option value=0>---</option>').val(0);
    $('#side').find('option').remove().end().append('<option value=0>---</option>').val(0);
    $('#duration').find('option').remove().end().append('<option value=0>---</option>').val(0);
    $('#toWager').val(0);
    $('#toWin').val(0);
    formatOrders();
    if (order.hasOwnProperty("duration")) {
        Modal.alert(`Successfully placed a bet! [${order.orderId}]`);
    }
  }

  function removeOrderSuccess(orderId) {
    formatOrders();
    Modal.alert(`Successfully cancelled your open bet. [${orderId}]`);
  }

  function walletConnected() {
    switchPinkSlipContent(4);
    formatOrders();
    displayGames();
  }