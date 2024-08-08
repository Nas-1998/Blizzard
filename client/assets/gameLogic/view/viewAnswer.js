const { Modal } = require("bootstrap");
const answerModal = document.querySelector("#answerModal");
const modal = new Modal(answerModal);

function openModal() {
  modal.show();
}

function closeModalEvent(handler) {
  answerModal.addEventListener("hide.bs.modal", async () => {
    await handler();
  });
}

function updateAnswer({ game, outcome }) {
  const title = answerModal.querySelector("#answerModal .modal-body h6");
  const livesEl = document.querySelector(".lives");
  const correctAnswerEl = document.querySelector(".correct_answer");
  const answerDescription = document.querySelector(".answer_description");
  const correctAnswerText = game.question.answers.find(
    (ans) => ans.answer_id === game.question.answer_id
  );

  title.textContent = outcome ? "Correct answer" : "Wrong answer";
  title.id = outcome ? "title_correct" : "title_wrong";

  //   livesEl.textContent = `Lives remaining: ${game.lives}`;

  livesEl.innerHTML = "";
  for (let i = 0; i < game.lives; i++) {
    const span = document.createElement("span");
    span.classList.add("lives_heart");
    livesEl.appendChild(span);
  }

  correctAnswerEl.textContent = correctAnswerText.answer_text;
  answerDescription.textContent = game.question.answer_description;
}

module.exports = { openModal, closeModalEvent, updateAnswer };
