const Submission = require("../models/Submission");

const show = async (req, res) => {
  try {
    const stats = await Submission.getQuestionsStats();
    res.status(200).json({ stats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const submissionData = req.body;
    const newSubmission = await Submission.create({
      ...submissionData,
      user_id: req.user,
    });
    res.status(201).json({ newSubmission });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { create, show };
