const db = require("../database/connect");

class Submission {
  constructor({user_id, question_id, outcome, submission_id}) {
    this.user_id = user_id;
    this.question_id = question_id;
    this.outcome = outcome;
    this.submission_id = submission_id;
  }

  static async create({ question_id, user_id, outcome }) {
    try {
    const newSubmission = await db.query(
      "INSERT INTO submission (user_id, question_id, outcome) VALUES ($1, $2 , $3) RETURNING *",
      [user_id, question_id, outcome]
    );

    if (newSubmission.rows.length !== 1) {
      throw new Error("Error creating new submission");
    }
    return new Submission(newSubmission.rows[0]);
  } catch (error) {
    throw new Error("Error creating new submission");
  }
}

  static async getQuestionsStats() {
    try {
    const result = await db.query(
      `SELECT
      q.question_id,
      q.question_description,
      COALESCE(
        (SUM(CASE WHEN s.outcome = TRUE THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(s.submission_id), 0)),
        0
      ) AS percentage_correct
    FROM
      submission s
    JOIN
      question q ON s.question_id = q.question_id
    GROUP BY
      q.question_id, q.question_description`
    );

    return result.rows;
  } catch (error) {
    throw new Error("Error fetching stats");
  }
}
}

module.exports = Submission;
