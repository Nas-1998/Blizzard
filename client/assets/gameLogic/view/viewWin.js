const { Modal } = require("bootstrap");
const winModal = document.querySelector("#winModal");
const modal = new Modal(winModal);

winModal.addEventListener("hide.bs.modal", (e) => {
  e.preventDefault();
});

function openModal() {
  console.log("test 1 2 1 2");
  modal.show();
}

module.exports = { openModal };
