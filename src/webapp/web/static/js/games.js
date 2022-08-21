let betData;

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