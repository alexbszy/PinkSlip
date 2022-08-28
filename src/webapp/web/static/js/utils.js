const DOWN_ARROW = "_";
const UP_ARROW = "&#748";
let currentIndex = 0;

const listOfSports = ['NFL', 'MLB', 'NBA', 'NCAAB', 'NHL', 'EPL', 'Ligue One', 'Bundesliga', 'Series A', 'La Liga'];
const listOfSportImages = ['football.png', 'baseball.png', 'basketball.png', 'basketball.png', 'hockey.png', 'soccer.png', 'soccer.png', 'soccer.png', 'soccer.png', 'soccer.png'];
let userBets = [];
let allBets = [];

const matchNameToMatchId = new Map();
const matchIdToMatchName = new Map();

function getFormattedDate(date) {
    let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        let timeOfDay = "AM"
        let hour = date.getHours();
        if (hour >= 12) {
            timeOfDay = "PM"
        }
        if (hour > 12) {
            hour-=12;
        }

        let sHour = hour.toString().padStart(2, '0');
        let sMinute = date.getMinutes().toString().padStart(2, '0');
        return `${month}/${day}/${year} ${sHour}:${sMinute} ${timeOfDay}`;

    }

function setUrlParam() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(listOfSports[currentIndex], "");
    window.location.hash = urlParams.toString().slice(0,-1);
}

function setIndex(index) {
    currentIndex = index;
    console.log("index is now", currentIndex);
    displayGames();
    setUrlParam();
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


