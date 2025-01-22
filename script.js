let slideIndex = 0;
let currentTimer = 0;  // 0: Namorar, 1: Conversar, 2: Conhecer

// Timer data for different events
const timerData = [
    { title: "Quando começamos a namorar…", startDate: "January 19, 2025 00:00:00" },
    { title: "Quando começamos a conversar…", startDate: "December 6, 2024 01:17:00" },
    { title: "Quando nos conhecemos…", startDate: "December 13, 2024 20:00:00" }
];

// Function to get the Spotify access token (Optimized using async/await)
const getAccessToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa('fdba7595753e4dd9bbf4265460d9053d:f2124e5fb90e4863b85846b1a778d7f3'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials',
    });

    return (await response.json()).access_token;
};

// Function to fetch and display playlist data
const displayPlaylist = async (playlistId) => {
    const token = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
    });

    const playlistData = await response.json();
    const trackList = playlistData.tracks.items;
    const playlistContainer = document.getElementById('playlist-container');
    playlistContainer.innerHTML = '';

    trackList.forEach(track => {
        const trackItem = document.createElement('div');
        trackItem.classList.add('track-item');

        trackItem.innerHTML = `
            <img src="${track.track.album.images[0].url}" alt="${track.track.name} cover">
            <h3>${track.track.name}</h3>
            <p>${track.track.artists[0].name}</p>
            <a href="${track.track.external_urls.spotify}" target="_blank">Listen on Spotify</a>
        `;
        
        playlistContainer.appendChild(trackItem);
    });
};

// Initialize Spotify Web Playback SDK
const initializeSpotifyPlayer = async () => {
    const token = await getAccessToken();
    const player = new Spotify.Player({
        name: 'My Spotify Player',
        getOAuthToken: (cb) => cb(token),
        volume: 0.5
    });

    player.addListener('ready', ({ device_id }) => {
        console.log('Web Playback SDK ready with device ID:', device_id);
        player.play({ context_uri: 'spotify:playlist:YOUR_PLAYLIST_ID' });
    });

    player.connect();
};

// Function to change slides with smoother transitions
const showSlides = () => {
    const slides = document.querySelectorAll(".slides");
    slides.forEach(slide => slide.style.opacity = "0");
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].style.opacity = "1";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
};

// Timer formatting and update function
const formatTime = (value) => (value < 10 ? `0${value}` : value);

const updateTimer = (timerIndex) => {
    const startDate = new Date(timerData[timerIndex].startDate).getTime();
    const currentDate = Date.now();
    const timeDiff = currentDate - startDate;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = `${formatTime(days)}:${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    document.getElementById("timer-title").innerHTML = timerData[timerIndex].title;
};

// Function to cycle through timers
const cycleTimer = () => {
    currentTimer = (currentTimer + 1) % timerData.length;
    updateTimer(currentTimer);
};

// Initialize everything on page load
const init = () => {
    showSlides();
    updateTimer(0);  // Start with "Começamos a namorar"
    setInterval(() => updateTimer(currentTimer), 1000);  // Update timer every second
    initializeSpotifyPlayer();
    displayPlaylist('your_playlist_id');  // Replace with actual playlist ID
};

// Run initialization
init();
