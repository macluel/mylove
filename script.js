let slideIndex = 0;
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

// Function to update the timer
function updateTimer(timerIndex) {
    var startDate = new Date(timerData[timerIndex].startDate).getTime();
    var currentDate = new Date().getTime();
    var timeDiff = currentDate - startDate;

    var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = `${days} dias ${hours} horas ${minutes} minutos ${seconds} segundos`;
    document.getElementById("timer-title").innerHTML = timerData[timerIndex].title;
}

// Function to cycle through the timers
function cycleTimer() {
    currentTimer = (currentTimer + 1) % timerData.length;
    updateTimer(currentTimer);
}

// Initial setup to ensure everything loads correctly
window.onload = function() {
    showSlides(); // Start slideshow
    updateTimer(0); // Immediately display the first timer on load
};

// Check if iframe fails to load and display offline message (for testing without internet)
document.getElementById('spotifyIframe').onerror = function() {
    document.getElementById('offlineMessage').style.display = 'block';
};

