// Function to change slides
function showSlides() {
    let slides = document.getElementsByClassName("slides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Hide all slides
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; } // Loop back to first slide
    slides[slideIndex - 1].style.display = "block"; // Show the current slide
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}

let currentTimer = 0; // 0 - Começamos a namorar, 1 - Começamos a conversar, 2 - Nos conhecemos

// Timer data in the new order
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

// Initial setup to ensure the correct timer is displayed on load
window.onload = function() {
    updateTimer(0); // Start with the first timer on load
};
