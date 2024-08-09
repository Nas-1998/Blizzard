const db = require("../database/connect");
const Answer = require("./Answer");

class Question {
  constructor({
    question_id,
    question_description,
    answer_id,
    answer_description,
    event_id,
    score,
  }) {
    this.question_id = question_id;
    this.question_description = question_description;
    this.answer_description = answer_description;
    this.answer_id = answer_id;
    this.event_id = event_id;
    this.score = score;
  }

  static async showByEvent(event_id) {
    const questions = await db.query(
      "SELECT * FROM question WHERE event_id = $1",
      [event_id]
    );

    if (questions.rows.length !== 1) throw new Error("Error finding question");

    return new Question(questions.rows[0]);
  }

  async getAnswers() {
    const answers = await db.query(
      "SELECT * FROM answers WHERE question_id = $1",
      [this.question_id]
    );

    if (answers.rows.length === 0) throw new Error("Error finding answers");

    return answers.rows.map((q) => new Answer(q));
  }
}

module.exports = Question;
