const folderPath = "assets/images/"; // Ensure this path is correct
const totalImages = 19; // Adjust this based on how many images you have
const gridContainer = document.getElementById("photoGrid");

for (let i = 1; i <= totalImages; i++) {
    const img = document.createElement("img");
    img.src = `${folderPath}IMG${i}.jpg`; // Example: IMG1.jpg, IMG2.jpg, ...
    img.alt = `Image ${i}`;
    gridContainer.appendChild(img);
}
