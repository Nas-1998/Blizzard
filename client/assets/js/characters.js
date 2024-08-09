const checkAuth = require("../utils/checkAuth");

const cardsContainer = document.getElementById("cardsContainer");
const API_URL = "https://blizzard-5jur.onrender.com";

cardsContainer.addEventListener("click", async function (e) {
  if (e.target.tagName === "BUTTON") {
    const characterId = e.target.getAttribute("data-id");
    window.location.href = `game.html?characterId=${characterId}`;
  }
});

// Fetch character data and events based on ID
async function fetchCharacterData() {
  try {
    // Fetch character details
    const response = await fetch(`${API_URL}/characters/`);

    if (!response.ok) throw new Error("Failed to fetch character data");

    const charactersData = await response.json();
    return charactersData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderCards(characters) {
  // Create card elements
  characters.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.className = "col-md-3 text-center mb-4";
    cardElement.innerHTML = `
            <div class="card text-light border-light h-100">
                <img src="${card.image_url}" class="card-img-top rounded-circle p-3 mx-auto d-block" alt="${card.title}">
                <div class="card-body">
                    <h5 class="card-title">${card.character_name}</h5>
                    <button type="button" class="btn btn-primary" data-id="${card.character_id}">Play</button>
                </div>
            </div>
        `;
    cardsContainer.appendChild(cardElement);
  });
}

(async function () {
  await checkAuth();
  const characters = await fetchCharacterData();
  renderCards(characters);
})();
