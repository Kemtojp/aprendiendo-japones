const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const clearButton = document.getElementById("clearButton");
const nextButton = document.getElementById("nextButton");
const hiraganaButton = document.getElementById("hiraganaButton");
const katakanaButton = document.getElementById("katakanaButton");
const selectionScreen = document.getElementById("selectionScreen");
const mainApp = document.getElementById("mainApp");
const referenceOverlay = document.getElementById("referenceOverlay");
const showReferenceButton = document.getElementById("showReference");
const groupContainer = document.createElement("div");
const backButton = document.createElement("button");

let currentGroup = [];
let currentIndex = 0;
let isDrawing = false;
let lastX = null;
let lastY = null;

// Crear el botón "Volver" y ocultarlo por defecto
backButton.textContent = "Volver";
backButton.classList.add("backButton");
backButton.style.display = "none";
document.body.appendChild(backButton);

// Grupos de caracteres
const hiraganaGroups = [
    ["あ", "い", "う", "え", "お"],
    ["か", "き", "く", "け", "こ"],
    ["さ", "し", "す", "せ", "そ"],
    ["た", "ち", "つ", "て", "と"],
    ["な", "に", "ぬ", "ね", "の"],
    ["は", "ひ", "ふ", "へ", "ほ"],
    ["ま", "み", "む", "め", "も"],
    ["や", "ゆ", "よ"],
    ["ら", "り", "る", "れ", "ろ"],
    ["わ", "を", "ん"],
    ["が", "ぎ", "ぐ", "げ", "ご"],
    ["ざ", "じ", "ず", "ぜ", "ぞ"],
    ["だ", "ぢ", "づ", "で", "ど"],
    ["ば", "び", "ぶ", "べ", "ぼ"],
    ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"]
];

const katakanaGroups = [
    ["ア", "イ", "ウ", "エ", "オ"],
    ["カ", "キ", "ク", "ケ", "コ"],
    ["サ", "シ", "ス", "セ", "ソ"],
    ["タ", "チ", "ツ", "テ", "ト"],
    ["ナ", "ニ", "ヌ", "ネ", "ノ"],
    ["ハ", "ヒ", "フ", "ヘ", "ホ"],
    ["マ", "ミ", "ム", "メ", "モ"],
    ["ヤ", "ユ", "ヨ"],
    ["ラ", "リ", "ル", "レ", "ロ"],
    ["ワ", "ヲ", "ン"],
    ["ガ", "ギ", "グ", "ゲ", "ゴ"],
    ["ザ", "ジ", "ズ", "ゼ", "ゾ"],
    ["ダ", "ヂ", "ヅ", "デ", "ド"],
    ["バ", "ビ", "ブ", "ベ", "ボ"],
    ["パ", "ピ", "プ", "ペ", "ポ"]
];

// Crear botones dinámicos para los grupos de letras
function createGroupButtons(groups) {
    groupContainer.innerHTML = "";
    groups.forEach((group) => {
        const button = document.createElement("button");
        button.textContent = group.join(""); // Mostrar las letras del grupo
        button.classList.add("groupButton");
        button.addEventListener("click", () => {
            currentGroup = group;
            currentIndex = 0;
            drawGuideCharacter(currentGroup[currentIndex]);
            groupContainer.style.display = "none";
            mainApp.style.display = "block";
        });
        groupContainer.appendChild(button);
    });
    groupContainer.style.display = "block";
    mainApp.style.display = "none";
    backButton.style.display = "block"; // Mostrar el botón "Volver" en el selector
    document.body.appendChild(groupContainer);
}

// Dibujar silueta
function drawGuideCharacter(character) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    ctx.font = "200px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Silueta translúcida
    ctx.fillText(character, canvas.width / 2, canvas.height / 2);
}

// Manejo de dibujo del mouse
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;

    // Guardar la posición inicial
    const rect = canvas.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    lastX = null; // Reiniciar posición al soltar el mouse
    lastY = null;
});

canvas.addEventListener("mouseout", () => {
    isDrawing = false;
    lastX = null;
    lastY = null;
});

canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Si hay una posición anterior, dibujar una línea desde ahí
    if (lastX !== null && lastY !== null) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY); // Desde la posición anterior
        ctx.lineTo(x, y); // Hasta la nueva posición
        ctx.strokeStyle = "black"; // Color del trazo
        ctx.lineWidth = 4; // Grosor del trazo
        ctx.lineCap = "round"; // Extremos redondeados
        ctx.stroke();
    }

    // Actualizar la posición anterior
    lastX = x;
    lastY = y;
});

// Manejar botón "Siguiente"
nextButton.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= currentGroup.length) {
        alert("¡Has completado el grupo!");
        currentIndex = 0;

        // Mostrar el selector de grupos al completar
        groupContainer.style.display = "block";
        mainApp.style.display = "none";

        // Mantener el botón "Volver" visible
        backButton.style.display = "block";
    } else {
        drawGuideCharacter(currentGroup[currentIndex]);
    }
});

// Manejar botón "Limpiar"
clearButton.addEventListener("click", () => {
    // Limpia únicamente los trazos del usuario
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawGuideCharacter(currentGroup[currentIndex]); // Redibuja la silueta actual
});

// Manejar el botón "Volver" para regresar al menú inicial
backButton.addEventListener("click", () => {
    if (groupContainer.style.display === "block") {
        // Volver al selector inicial (Hiragana/Katakana)
        groupContainer.style.display = "none";
        selectionScreen.style.display = "block";

        // Ocultar el botón "Volver" al regresar al inicio
        backButton.style.display = "none";
    } else if (mainApp.style.display === "block") {
        // Volver al selector de grupos desde el dibujo
        mainApp.style.display = "none";
        groupContainer.style.display = "block";

        // Mantener el botón "Volver" visible en el selector de grupos
        backButton.style.display = "block";
    }
});



// Seleccionar Hiragana
hiraganaButton.addEventListener("click", () => {
    createGroupButtons(hiraganaGroups);
    selectionScreen.style.display = "none";
});

// Seleccionar Katakana
katakanaButton.addEventListener("click", () => {
    createGroupButtons(katakanaGroups);
    selectionScreen.style.display = "none";
});

// Mostrar y ocultar referencia
showReferenceButton.addEventListener("click", () => {
    referenceOverlay.classList.add("show");
});

referenceOverlay.addEventListener("click", (e) => {
    if (e.target === referenceOverlay) {
        referenceOverlay.classList.remove("show");
    }
});
