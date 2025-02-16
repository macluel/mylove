const folderPath = "assets/images/";
const jsonFile = `${folderPath}images.json`;
const gridContainer = document.getElementById("photoGrid");

// Fetch images.json dynamically
fetch(jsonFile)
  .then(response => response.json())
  .then(data => {
    const totalImages = data.images.length; // Get the number of images

    data.images.forEach(imageName => {
        const img = document.createElement("img");
        img.src = `${folderPath}${imageName}`;
        img.alt = imageName;
        gridContainer.appendChild(img);
    });
  })
  .catch(error => console.error("Error loading images:", error));
