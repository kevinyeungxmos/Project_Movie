// This file contains:
// a generic function on all webpages to prevent users from
// missing data on Purchase page

// 
// Create movie details when not redirected from details page
// 
// @param item     :  checker for value wanted in html; if no, create one using list[0]
//                    after creating a list of all possible values to a key
// @param itemList :  used for creating a local storage item storing list of values of a key
// @param value    :  used to set item value for local storage
// 

const setMovieDetails = (item, itemList, value) => {
    if (!localStorage.getItem("isRedirectedFromNowPlaying") ||
        localStorage.getItem("isRedirectedFromNowPlaying") !== "true") {
        localStorage.setItem(itemList, JSON.stringify(value))
        const allItems = JSON.parse(localStorage.getItem(itemList))
        if (allItems && allItems.length > 0) {
            localStorage.setItem(item, allItems[0])
        }
    }
}

// Set earliest slot when users do not enter from NOW PLAYING
// allPlayingTimes OR Dates refer to "specific date only"

let allAvailableSlots = {}

for (let i = 23; i < 28; i++) {
    let tmpSlots = []
    for (let j = 10; j < 24; j += 4) {
        if ( (i + j) % 3 !== 0) {
            tmpSlots.push(j + ":00")
        }
    }
    if (tmpSlots.length > 0) {
        allAvailableSlots[i + " Jan"] = tmpSlots
    }
}

const allPlayingMovies = ["Avengers: Endgame"]
let allPlayingDates = []
let allPlayingTimes = []

let allDates = Object.keys(allAvailableSlots)
let allTimes = Object.values(allAvailableSlots)

for (let i = 0; i < allTimes.length; i++) {
    if (allTimes[i].length >= 1) {
        allPlayingTimes = allTimes[i]
        allPlayingDates = allDates
        break
    }
}

setMovieDetails("nowPlaying", "allPlayingMovies", allPlayingMovies)
setMovieDetails("showDate", "allPlayingDates", allPlayingDates)
setMovieDetails("showTime", "allPlayingTimes", allPlayingTimes)