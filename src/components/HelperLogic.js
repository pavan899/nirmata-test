const playerType = {
    allRounder: "All rounder",
    batsman: "Batsman",
    bowler: "Bowler",
    wicketKeeper: "Wicket keeper"
}

// calculates age till current date
const getAge = (epoch) => {
    const date = new Date(epoch);
    const today = new Date();
    var output;
    const TM = Number(today.getMonth()) + 1;
    const TY = Number(today.getFullYear());
    const M = Number(date.getMonth()) + 1;
    const Y = Number(date.getFullYear());
    var YY = TY - Y;
    var MM = TM - M;
    if (MM < 0) {
        YY -= 1;
        MM += 12;
    }
    if (YY.toString().length < 2) {
        YY = `0${YY}`;
    }
    if (MM.toString().length < 2) {
        MM = `0${MM}`;
    }
    if(MM === "00"){
        output = `${YY} Y`;
    } else {
        output = `${YY} Y ${MM} M`;
    }
    return output;
}

function getDobFromEpoch(epoch, seperator) {
    const date = new Date(epoch);
    const DD = date.getDate();
    const MM = Number(date.getMonth()) + 1;
    const YYYY = date.getFullYear();

    function checkDateLength(val) {
        if(val.toString().length < 2) {
            return `0${val}`
        } else {
            return val
        }
    }
    return `${checkDateLength(DD)}${seperator}${checkDateLength(MM)}${seperator}${YYYY}`;
}

function playerRating(playerPoints, allPlayers) {
    const topPoints = Math.max(...allPlayers.map((pl)=>pl.points));
    const rating = (((100 / Number(topPoints)) * Number(playerPoints)) / 100) * 5;
    return rating;
}

function playerNameSign(name) {
    const names = name.split(" ");
    var sign = "";
    names.map((name)=>{
        sign +=name[0];
    })
    return sign;
}

export { getAge, getDobFromEpoch, playerType, playerRating, playerNameSign }
