/**
* Showtime
*
* @author Kao
*/

const showSchedule = document.getElementById("show-schedule")

for (let i = 23; i < 28; i++) {
    showSchedule.innerHTML += `<button class="date-btn" disabled>${i} Jan</button>`
    for (let j = 10; j < 24; j+=4) {
        if ( (i + j) % 3 === 0) {
            // Sold out
            showSchedule.innerHTML += `<button class="sold-out" disabled>SOLD OUT</button>`
        } else {
            // Available
            showSchedule.innerHTML += `<button class="time-btn" data-movie="Avengers: Endgame" data-date="${i} Jan" data-time="${j}:00">${j}:00</button>`
        }
    }
}

showSchedule.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        localStorage.setItem("nowPlaying", event.target.getAttribute("data-movie"))
        localStorage.setItem("showDate", event.target.getAttribute("data-date"))
        localStorage.setItem("showTime", event.target.getAttribute("data-time"))
        localStorage.setItem("isRedirectedFromNowPlaying", "true")
        location.href = "purchase.html"
    }
})