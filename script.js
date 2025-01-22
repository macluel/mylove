let slideIndex = 0;
let currentTimer = 0;

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
            'Authorization': 'Basic ' + btoa('fdba7595753e4dd9bbf4265460d9053d:f2124e5fb90e4863b85846b1a778d7f3'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    return data.access_token;
}

// Function to fetch playlist data using the access token
async function getPlaylistData(playlistId) {
    const token = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
}

// Function to display the playlist data
async function displayPlaylist(playlistId) {
    const playlistData = await getPlaylistData(playlistId);
    const trackList = playlistData.tracks.items;

    const playlistContainer = document.getElementById('playlist-container');
    playlistContainer.innerHTML = ''; // Clear existing content

    trackList.forEach(track => {
        const trackItem = document.createElement('div');
        trackItem.classList.add('track-item');

        const trackName = document.createElement('h3');
        trackName.innerText = track.track.name;

        const trackArtist = document.createElement('p');
        trackArtist.innerText = track.track.artists[0].name;

        const trackImage = document.createElement('img');
        trackImage.src = track.track.album.images[0].url;
        trackImage.alt = `${track.track.name} cover`;

        const trackLink = document.createElement('a');
        trackLink.href = track.track.external_urls.spotify;
        trackLink.innerText = 'Listen on Spotify';

        const playButton = document.createElement('button');
        playButton.classList.add('play-button');
        playButton.innerText = '▶️'; // Play button emoji
        playButton.onclick = function() {
            // Logic to play the song, use the Spotify Web API to control playback
            alert(`Playing: ${track.track.name}`);
        };

        trackItem.appendChild(trackImage);
        trackItem.appendChild(trackName);
        trackItem.appendChild(trackArtist);
        trackItem.appendChild(trackLink);
        trackItem.appendChild(playButton);

        playlistContainer.appendChild(trackItem);
    });
}

// Function to change slides
function showSlides() {
    let slides = document.getElementsByClassName("slides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].classList.add('active'); // Show the current slide
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}

// Initial setup
showSlides();
displayPlaylist('5qEOCUhoWS6S2JNHb7M5Zd'); // Your playlist ID
