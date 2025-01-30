let slideIndex = 0;
let randomOrder = []; // Array to store the random order of slides

// Function to shuffle and get a random order for the slides
function shuffleSlides() {
    let slides = Array.from(document.getElementsByClassName("slides"));
    randomOrder = [];

    // Shuffle the slides and store them in randomOrder
    while (slides.length > 0) {
        let randomIndex = Math.floor(Math.random() * slides.length);
        randomOrder.push(slides.splice(randomIndex, 1)[0]);
    }
}

// Function to show the slides based on the random order
function showSlides() {
    // Hide all slides initially
    let slides = document.getElementsByClassName("slides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }

    // Increment slide index, if it exceeds the total, reset to 1
    slideIndex++;
    if (slideIndex > randomOrder.length) {
        slideIndex = 1;
    }

    // Show the current slide from the random order
    randomOrder[slideIndex - 1].classList.add("active");
}

// Start the slideshow on page load
window.onload = function() {
    shuffleSlides(); // Shuffle the slides when the page loads
    showSlides(); // Start the slideshow with the shuffled order
};

// Initialize the slideshow with setInterval (every 3 seconds)
setInterval(showSlides, 3000); // Every 3 seconds

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
