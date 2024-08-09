const { Modal } = require("bootstrap");
const gameoverModal = document.querySelector("#gameoverModal");
const modal = new Modal(gameoverModal);

gameoverModal.addEventListener("hide.bs.modal", (e) => {
  e.preventDefault();
});

function openModal() {
  console.log("test 1 2 1 2");
  modal.show();
}

module.exports = { openModal };
