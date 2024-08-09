const Event = require("../models/Event");

const index = async (req, res) => {
  try {
    const id = req.params.characterId;
    const events = await Event.show(id);
    res.status(200).json(events);
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
};

module.exports = { index };
