let slideIndex = 0;
let randomOrder = [];

function shuffleSlides() {
    let slides = Array.from(document.getElementsByClassName("slides"));
    randomOrder = [];

    while (slides.length > 0) {
        let randomIndex = Math.floor(Math.random() * slides.length);
        randomOrder.push(slides.splice(randomIndex, 1)[0]);
    }

    // Reattach the slides in shuffled order
    const slideshowContainer = document.querySelector(".slideshow-container");
    randomOrder.forEach(slide => {
        slideshowContainer.appendChild(slide);
    });
}

function showSlides() {
    let slides = document.getElementsByClassName("slides");

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }

    // Show the next slide in the shuffled order
    slideIndex++;
    if (slideIndex >= randomOrder.length) {
        slideIndex = 0;
    }

    randomOrder[slideIndex].classList.add("active");
}

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

// Initialize the slideshow with setInterval
setInterval(showSlides, 3000); // Every 3 seconds

// Ensure the timer is updated when the page loads
window.addEventListener("load", function() {
    updateTimer(currentTimer);
    shuffleSlides();
    showSlides(); // Ensure the first slide appears
    setInterval(showSlides, 3000); // Start interval only after first slide is shown
    setInterval(() => updateTimer(currentTimer), 1000); // Update the timer every second
    var audio = document.getElementById("myAudio");
    audio.volume = 0.1;  // Set volume to 20%
});

