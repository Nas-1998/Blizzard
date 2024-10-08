const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const login = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findByUsername(data.username);

    const match = await bcrypt.compare(data.password, user.password);
    console.log("match", match);
    if (!match) throw new Error("Unable to authenticate");

    jwt.sign(
      { user_id: user.user_id },
      process.env.SECRET_TOKEN,
      {
        expiresIn: 3600,
      },
      (err, data) => {
        if (err) {
          res.status(500).json({ error: "Error generating token" });
        } else {
          res.status(200).json({ token: data });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const signup = async (req, res) => {
  const data = req.body;
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));

    data.password = await bcrypt.hash(data.password, salt);

    const newUser = await User.create(data);

    jwt.sign(
      { user_id: newUser.user_id },
      process.env.SECRET_TOKEN,
      {
        expiresIn: 3600,
      },
      (err, data) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, error: "Error generating token" });
        } else {
          res.status(201).json({ token: data });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(404).send({ error: err });
  }
};

const showStats = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res
      .status(200)
      .json({ username: user.username, highscore: user.highscore });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const updateHighscore = async (req, res) => {
  try {
    const { highscore } = req.body;
    const user = await User.findById(req.user);
    const updatedUser = await user.updateHighscore(parseInt(highscore));
    res.status(200).json({ highscore });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
};

const tokenValidation = (req, res) => {
  if (req.user) {
    res.status(200).json({ valid: true });
  } else {
    res.status(401).json({ valid: false });
  }
};

module.exports = { login, signup, showStats, updateHighscore, tokenValidation };
