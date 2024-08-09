const Question = require("../models/Question");

const show = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const question = await Question.showByEvent(eventId);
    const answers = await question.getAnswers();
    res.status(200).json({ ...question, answers });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { show };
