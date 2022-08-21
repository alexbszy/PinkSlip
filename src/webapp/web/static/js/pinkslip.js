let pinkSlipState = 1;

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
            createSportDropDown($(".pink-slip-body-content-1"));
            createMatchDropDown($(".pink-slip-body-content-1"));
            createSideDropDown($(".pink-slip-body-content-1"));
            createToWagerDropDown($(".pink-slip-body-content-1"));
            createToWinDropDown($(".pink-slip-body-content-1"));
            createAllowPartialFillsDropDown($(".pink-slip-body-content-1"));
            console.log("placing bet");
        default:
          // code block
      }
      console.log(pinkSlipState);
}

function createSportDropDown(elementToAppendTo) {
    const prompt = "do something";
    const html = 
    `<label for="league">${prompt}</label>`
    + `<select id="league">`
      + `<option value=1>nfl</option>`
      + `<option value=2>nba</option>`
    + `</select>`;
    elementToAppendTo.append(html);
}

function createMatchDropDown(elementToAppendTo) {
    const prompt = "do something";
    const html = 
    `<label for="match">${prompt}</label>`
    + `<select id="match">`
      + `<option value=1>bears-vs-viking</option>`
      + `<option value=2>chargers-vs-colts</option>`
    + `</select>`;
    elementToAppendTo.append(html);
}

function createSideDropDown(elementToAppendTo) {
    const prompt = "do something";
    const html = 
    `<label for="side">${prompt}</label>`
    + `<select id="side">`
      + `<option value=1>bears</option>`
      + `<option value=2>vikings</option>`
    + `</select>`;
    elementToAppendTo.append(html);
}

function createToWagerDropDown(elementToAppendTo) {
    const prompt = "do something";
    const html = 
    `<label for="toWager">${prompt}</label>`
    + `<input id="toWager">${""}</input>`;
    elementToAppendTo.append(html);
}

function createToWinDropDown(elementToAppendTo) {
    const prompt = "do something";
    const html = 
    `<label for="toWin">${prompt}</label>`
    + `<input id="toWin">${""}</input>`;
    elementToAppendTo.append(html);
}


function createAllowPartialFillsDropDown(elementToAppendTo) {
    const prompt = "do something";
    const html = 
    `<label for="allowParitalFills">${prompt}</label>`
    + `<type="checkbox" id="allowParitalFills">${true}</input>`;
    elementToAppendTo.append(html);
}