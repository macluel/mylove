const slideshowContainer = document.getElementById("slideshow");
const totalImages = 20; // Adjust based on the number of images you have
const folderPath = "assets/images/";

// Generate the slides dynamically
for (let i = 1; i <= totalImages; i++) {
    const img = document.createElement("img");
    img.className = "slides";
    img.src = `${folderPath}IMG${i}.jpg`;
    img.alt = `Slide ${i}`;
    slideshowContainer.appendChild(img);
}

// Variables for slideshow
let slideIndex = 0;
let randomOrder = [];

// Fisher-Yates shuffle function
function shuffleSlides() {
    let slides = Array.from(document.getElementsByClassName("slides"));
    for (let i = slides.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [slides[i], slides[j]] = [slides[j], slides[i]]; // Swap elements
    }
    randomOrder = slides;
    randomOrder.forEach(slide => slideshowContainer.appendChild(slide));
}

// Show slides in shuffled order
function showSlides() {
    let slides = document.getElementsByClassName("slides");
    
    // Hide all slides
    for (let slide of slides) {
        slide.classList.remove("active");
    }

    // Show next slide
    slideIndex = (slideIndex + 1) % randomOrder.length;
    randomOrder[slideIndex].classList.add("active");
}

// Start slideshow on page load
window.addEventListener("load", function () {
    shuffleSlides();
    showSlides();
    setInterval(showSlides, 3000); // Change slides every 3 seconds
});

// Timer data
const timerData = [
    {
        title: "Começamos a namorar",
        startDate: "January 19, 2025 00:00:00"
    },
    {
        title: "Começamos a conversar",
        startDate: "December 6, 2024 00:00:00"
    },
    {
        title: "Nos conhecemos",
        startDate: "December 13, 2024 00:00:00"
    }
];

let currentTimer = 0; // 0 - Começamos a namorar, 1 - Começamos a conversar, 2 - Nos conhecemos

// Function to update the timer
function updateTimer(timerIndex) {
    var startDate = new Date(timerData[timerIndex].startDate).getTime();
    var currentDate = new Date().getTime();
    var timeDiff = currentDate - startDate;

    var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    // Fade out previous numbers
    document.getElementById("days-number").classList.add("fade-out");
    document.getElementById("hours-number").classList.add("fade-out");
    document.getElementById("minutes-number").classList.add("fade-out");
    document.getElementById("seconds-number").classList.add("fade-out");

    // Wait for fade-out to finish, then update and fade in new numbers
    setTimeout(() => {
        document.getElementById("days-number").innerText = days;
        document.getElementById("hours-number").innerText = hours;
        document.getElementById("minutes-number").innerText = minutes;
        document.getElementById("seconds-number").innerText = seconds;

        // Remove fade-out and add fade-in effect
        document.getElementById("days-number").classList.remove("fade-out");
        document.getElementById("hours-number").classList.remove("fade-out");
        document.getElementById("minutes-number").classList.remove("fade-out");
        document.getElementById("seconds-number").classList.remove("fade-out");

        document.getElementById("days-number").classList.add("fade-in");
        document.getElementById("hours-number").classList.add("fade-in");
        document.getElementById("minutes-number").classList.add("fade-in");
        document.getElementById("seconds-number").classList.add("fade-in");

        // Update the title
        document.getElementById("timer-title").innerHTML = timerData[timerIndex].title;
    }, 500); // Duration must match the CSS transition
}

// Function to cycle through the timers
function cycleTimer() {
    currentTimer = (currentTimer + 1) % timerData.length;
    updateTimer(currentTimer); // Update the timer display
}

// Ensure the timer is updated when the page loads
window.addEventListener("load", function () {
    updateTimer(currentTimer);
    setInterval(() => updateTimer(currentTimer), 1000); // Update the timer every second
    setInterval(cycleTimer, 10000); // Change timer every 10 seconds
    setInterval(showSlides, 3000); // Start interval only after first slide is shown
});

// Audio control functionality
let audio = document.getElementById('myAudio');
let playPauseButton = document.querySelector('.play-pause');
let progressSlider = document.querySelector('.audio-progress');
let volumeSlider = document.querySelector('.audio-volume-slider');

// Play/Pause button functionality
playPauseButton.addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = '❚❚';  // Change button to pause
    } else {
        audio.pause();
        playPauseButton.innerHTML = '▶';  // Change button to play
    }
});

// Update progress bar as audio plays
audio.addEventListener('timeupdate', function () {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressSlider.value = progress;
});

// Make progress bar clickable
progressSlider.addEventListener('input', function () {
    let seekTo = (progressSlider.value / 100) * audio.duration;
    audio.currentTime = seekTo;
});

// Volume control functionality
volumeSlider.addEventListener('input', function () {
    audio.volume = volumeSlider.value / 100;
});

audio.volume = 0.1;  // Set volume to 10%
// Set volume slider to match the volume
volumeSlider.value = 10;  // Set slider to match the default volume