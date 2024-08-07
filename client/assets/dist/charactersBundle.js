(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"../utils/checkAuth":2}],2:[function(require,module,exports){
async function checkAuth() {
  const options = {
    method: "GET",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  const response = await fetch(
    "https://blizzard-5jur.onrender.com/users/validate-token",
    options
  );

  if (response.status !== 200) {
    window.location.href = "login.html";
  }
}

module.exports = checkAuth;

},{}]},{},[1]);
