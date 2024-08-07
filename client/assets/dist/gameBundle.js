(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const GameState = require("./logic.js");
const checkAuth = require("./../utils/checkAuth.js");
const quizOptions = document.querySelectorAll("#table .option ");
const questionDescription = document.querySelector(".question-description");
const answersContainer = document.querySelector(".answers");
const bgContainer = document.querySelector("#bg-container");
const charContainer = document.querySelector("#char-img");

const game = new GameState();

answersContainer.addEventListener("click", async function (e) {
  const target = e.target.closest(".option");

  if (!target) return;
  const result = await game.checkForAnswers(parseInt(target.dataset.answerId));
  await game.sendSubmission(result);
  const nextQuestion = await game.fetchNextQuestion();
  if (nextQuestion === -1) {
    // finish game
  } else {
    updateQuestion();
  }
});

const updateImgs = () => {
  const char_img = game.char_image_url;
  const bg_img = game.bg_image_url;

  bgContainer.style.backgroundImage = `url(${bg_img})`;
  charContainer.style.backgroundImage = `url(${char_img})`;
};

const updateQuestion = () => {
  const question = game.question;

  updateImgs();
  questionDescription.textContent = question.question_description;
  question.answers.forEach((answer, i) => {
    const thElement = quizOptions[i].querySelector(".option-descrition");
    thElement.innerHTML = answer.answers;
    quizOptions[i].dataset.answerId = answer.answer_id;
  });
};

(async function () {
  await checkAuth();
  await game.init();
  updateQuestion();
})();

},{"./../utils/checkAuth.js":3,"./logic.js":2}],2:[function(require,module,exports){
class gameState {
  constructor() {
    this.user_highscore = 0;
    this.score = 0;
    this.question = {};
    this.character = {};
    this.lives = 3;
    this.event = [];
    this.eventIndex = 0;
    this.char_image_url = {};
    this.bg_image_url = {};
  }

  async fetchForUser() {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      };

      const response = await fetch(
        `https://blizzard-5jur.onrender.com/users/stats`,
        options
      );

      if (response.ok) {
        const data = await response.json();
        this.user_highscore = data.highscore;
      } else {
        throw new Error("Error: " + response.status);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async fetchForCharacter(id) {
    try {
      const response = await fetch(
        `https://blizzard-5jur.onrender.com/characters/${id}`
      );

      if (response.ok) {
        const data = await response.json();
        this.character = data;
      } else {
        throw new Error("Error: " + response.status);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async fetchForEvents(id) {
    try {
      const response = await fetch(
        `https://blizzard-5jur.onrender.com/events/${id}`
      );

      if (response.ok) {
        const data = await response.json();
        const charImg = data[0].char_image_url;
        const bgImg = data[0].bg_image_url;

        this.event = data;
        this.char_image_url = charImg;
        this.bg_image_url = bgImg;
      } else {
        throw new Error("Error: " + response.status);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async fetchForQuestions(id) {
    try {
      const response = await fetch(
        `https://blizzard-5jur.onrender.com/questions/${id}`
      );

      if (response.ok) {
        const data = await response.json();
        this.question = data;
      } else {
        throw new Error("Error: " + response.status);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async checkForAnswers(id) {
    this.eventIndex += 1;

    if (this.question.answer_id < id) {
      this.score += this.question.score;
      return true;
      // this.event.length === this.eventIndex
    } else {
      this.lives -= 1;
      return false;
    }
  }

  async fetchNextQuestion() {
    if (this.eventIndex >= this.event.length) {
      return -1;
    } else {
      await this.fetchForQuestions(this.event[this.eventIndex].event_id);
      return this.question;
    }
  }

  async sendSubmission(outcome) {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        question_id: this.question.question_id,
        outcome: outcome,
      }),
    };

    const response = await fetch(
      "https://blizzard-5jur.onrender.com/submissions/",
      options
    );

    if (!response.ok) {
      console.log("Error to create submission");
    }
  }

  async init() {
    await this.fetchForUser();
    await this.fetchForCharacter(1);
    await this.fetchForEvents(this.character.character_id);
    await this.fetchForQuestions(this.event[this.eventIndex].event_id);
    console.log(this);
    // console.log("Fetch for Character", this.character);
    // console.log("Fetch for Events", this.event[this.eventIndex].event_id);
    // console.log("Event Index", this.eventIndex);
    // console.log("Fetch for Questions", this.question);
  }
}

module.exports = gameState;

},{}],3:[function(require,module,exports){
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
