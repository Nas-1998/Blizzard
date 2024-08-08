class gameState {
  constructor() {
    this.user_highscore = 0;
    this.score = 0;
    this.question = {};
    this.character = {};
    this.lives = 3;
    this.event = [];
    this.eventIndex = 0;
    this.state = "beforeInit";
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

        this.event = data;
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

    if (this.question.answer_id === id) {
      this.score += this.question.score;
      return true;
      // this.event.length === this.eventIndex
    } else {
      this.lives -= 1;
      return false;
    }
  }

  async checkForHighScore() {
    if (this.score > this.user_highscore) {
      await this.sendHighscore();
    } else {
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

  async sendHighscore() {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          highscore: this.score,
        }),
      };

      const response = await fetch(
        "https://blizzard-5jur.onrender.com/users/highscore",
        options
      );

      if (!response.ok) {
        throw new Error("Error Submitting the new highscore");
      }
    } catch (err) {
      console.error(err);
    }
  }

  async sendSubmission(outcome) {
    try {
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
        throw new Error("Error submitting the answer");
      }
    } catch (err) {
      console.error(err);
    }
  }

  checkGameState() {
    if (this.lives == 0) {
      this.state = "lost";
      return;
    }
    if (this.eventIndex >= this.event.length) {
      this.state = "won";
      return;
    }
  }

  async init(characterId) {
    await this.fetchForUser();
    await this.fetchForCharacter(characterId);
    await this.fetchForEvents(this.character.character_id);
    await this.fetchForQuestions(this.event[this.eventIndex].event_id);
    this.state = "running";
  }
}

module.exports = gameState;
