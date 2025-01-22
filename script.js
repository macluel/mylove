let slideIndex = 0;
let currentTimer = 0; // 0 - Começamos a namorar, 1 - Começamos a conversar, 2 - Nos conhecemos

// Timer data in the new order
const timerData = [
    {
        title: "Quando começamos a namorar…",
        startDate: "January 19, 2025 00:00:00"
    },
    {
        title: "Quando começamos a conversar…",
        startDate: "December 6, 2024 01:17:00"
    },
    {
        title: "Quando nos conhecemos…",
        startDate: "December 13, 2024 20:00:00"
    }
];

// Function to get the Spotify access token
async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa('fdba7595753e4dd9bbf4265460d9053d:f2124e5fb90e4863b85846b1a778d7f3'), // Replace with your credentials
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    return data.access_token;
}

// Function to change slides
function showSlides() {
    let slides = document.getElementsByClassName("slides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}

// Function to update the timer
function updateTimer(timerIndex) {
    var startDate = new Date(timerData[timerIndex].startDate).getTime();
    var currentDate = new Date().getTime();
    var timeDiff = currentDate - startDate;

    var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = `${days}:${hours}:${minutes}:${seconds}`;
    document.getElementById("timer-title").innerHTML = timerData[timerIndex].title;
}

// Function to cycle through the timers
function cycleTimer() {
    currentTimer = (currentTimer + 1) % timerData.length;
    updateTimer(currentTimer);
}

// This function will be used to interact with Spotify once the token is available
async function initializeSpotifyPlayer() {
    const accessToken = await getAccessToken();

    // You can use the access token here to make API requests, e.g., to control playback or embed Spotify content
    console.log("Access Token:", accessToken);

    // For now, you could simply display an iframe with a Spotify playlist, but we could also use the token to interact more directly with the Spotify Web API
    const spotifyEmbed = document.getElementById("spotify-player");
    spotifyEmbed.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/your_playlist_id" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
}

// Initial setup
showSlides();
updateTimer(0); // Initial timer for "Começamos a namorar"

// Update timer every second
setInterval(() => updateTimer(currentTimer), 1000);

// Initialize Spotify Player (called after the page loads)
initializeSpotifyPlayer();
