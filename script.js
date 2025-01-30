let slideIndex = 0;
let randomOrder = [];

function shuffleSlides() {
    let slides = Array.from(document.getElementsByClassName("slides"));
    randomOrder = [];

    while (slides.length > 0) {
        let randomIndex = Math.floor(Math.random() * slides.length);
        randomOrder.push(slides.splice(randomIndex, 1)[0]);
    }
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

const timerData = [
    { title: "Começamos a namorar", startDate: "January 19, 2025 00:00:00" },
    { title: "Começamos a conversar", startDate: "December 6, 2024 00:00:00" },
    { title: "Nos conhecemos", startDate: "December 13, 2024 00:00:00" }
];

let currentTimer = 0;

function updateTimer(timerIndex) {
    var startDate = new Date(timerData[timerIndex].startDate).getTime();
    var currentDate = new Date().getTime();
    var timeDiff = currentDate - startDate;

    var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById("days-number").innerText = days;
    document.getElementById("hours-number").innerText = hours;
    document.getElementById("minutes-number").innerText = minutes;
    document.getElementById("seconds-number").innerText = seconds;

    document.getElementById("timer-title").innerHTML = timerData[timerIndex].title;
}

function cycleTimer() {
    currentTimer = (currentTimer + 1) % timerData.length;
    updateTimer(currentTimer);
}

// Ensure the timer is updated when the page loads
window.addEventListener("load", function() {
    updateTimer(currentTimer);
    shuffleSlides();
    showSlides(); // Ensure the first slide appears
    setInterval(showSlides, 3000); // Start interval only after first slide is shown
});
