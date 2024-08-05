const db = require("../database/connect");

class User {
  constructor({ user_id, username, password, highscore, role }) {
    this.user_id = user_id;
    this.username = username;
    this.password = password;
    this.highscore = highscore;
    this.role = role;
  }

  static async findByUsername(username) {
    if (!username) throw new Error("Please provide a username");

    const query = await db.query("SELECT * FROM user WHERE username = $1", [
      username,
    ]);

    if (query.rows.length !== 1) {
      throw new Error("Unable to authenticate user");
    }

    return new User(query.rows[0]);
  }

  static async create({ username, password }) {
    if (!username || !password)
      throw new Error("Please provide required fields");

    const query = await db.query(
      "INSERT INTO user (username , password , highscore , role) VALUES ($1 , $2 , 0 , 'user')",
      [username, password]
    );

    if (query.rows.length !== 1) {
      throw new Error("Unable to authenticate user");
    }

    return new User(query.rows[0]);
  }
}

module.exports = User;
