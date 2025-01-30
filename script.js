let slideIndex = 0;
let randomOrder = [];

function shuffleSlides() {
    let slides = Array.from(document.getElementsByClassName("slides"));
    randomOrder = [];

    while (randomOrder.length < slides.length) {
        let randomIndex = Math.floor(Math.random() * slides.length);
        if (!randomOrder.includes(randomIndex)) {
            randomOrder.push(randomIndex);
        }
    }
}

function showSlides() {
    let slides = Array.from(document.getElementsByClassName("slides"));
    shuffleSlides();  // Randomize slides order each time

    slides.forEach((slide, index) => {
        slide.style.display = "none";  // Hide all slides
    });

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[randomOrder[slideIndex - 1]].style.display = "block";  // Show the next slide in random order
    setTimeout(showSlides, 3000);  // Change image every 3 seconds
}

window.onload = showSlides;
