// Variables para el expositor de imágenes
const cardContainer = document.createElement("div");
const cardImage = document.createElement("img");
const cardPrevButton = document.createElement("button");
const cardNextButton = document.createElement("button");
const closeCardButton = document.createElement("button");
let currentCardIndex = 1;
let currentFolder = "";

// Configuración inicial del contenedor de imágenes
cardContainer.style.display = "none";
cardContainer.style.flexDirection = "column";
cardContainer.style.alignItems = "center";
cardContainer.style.marginTop = "20px";

cardImage.style.maxWidth = "90%";
cardImage.style.border = "2px solid #333";
cardImage.style.borderRadius = "10px";

cardPrevButton.textContent = "Anterior";
cardNextButton.textContent = "Siguiente";
closeCardButton.textContent = "Cerrar";

[cardPrevButton, cardNextButton, closeCardButton].forEach((btn) => {
    btn.style.margin = "10px";
    btn.style.padding = "10px 20px";
    btn.style.backgroundColor = "#007bff";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.borderRadius = "5px";
    btn.style.cursor = "pointer";
});

cardContainer.appendChild(cardImage);
cardContainer.appendChild(cardPrevButton);
cardContainer.appendChild(cardNextButton);
cardContainer.appendChild(closeCardButton);
document.body.appendChild(cardContainer);

// Función para actualizar la imagen mostrada
function updateCardImage(folder, index) {
    cardImage.src = `img/${folder}/${folder.toLowerCase()}-(${index}).jpg`;
}

// Función para iniciar el expositor de imágenes
function showCardViewer(folder) {
    currentFolder = folder;
    currentCardIndex = 1; // Inicia desde la primera imagen
    updateCardImage(currentFolder, currentCardIndex);
    cardContainer.style.display = "flex"; // Mostrar el contenedor
}

// Eventos para avanzar y retroceder en las imágenes
cardPrevButton.addEventListener("click", () => {
    if (currentCardIndex > 1) {
        currentCardIndex--;
        updateCardImage(currentFolder, currentCardIndex);
    }
});

cardNextButton.addEventListener("click", () => {
    if (currentCardIndex < 46) {
        currentCardIndex++;
        updateCardImage(currentFolder, currentCardIndex);
    }
});

// Evento para cerrar el expositor de imágenes
closeCardButton.addEventListener("click", () => {
    cardContainer.style.display = "none"; // Ocultar el contenedor
});
