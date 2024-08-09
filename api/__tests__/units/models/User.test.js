const db = require("../../../database/connect");
const User = require("../../../models/User");

describe("User model", () => {
  describe("create", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Returns a new User instance", async () => {
      const mockUser = {
        username: "username",
        password: "password",
        highscore: 0,
        role: "user",
      };

      const mockArguments = { username: "username", password: "password" };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [mockUser] });

      const result = await User.create(mockArguments);

      expect(result).toBeInstanceOf(User);
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(
        "INSERT INTO users (username , password , highscore , role) VALUES ($1 , $2 , 0 , 'user') RETURNING *",
        ["username", "password"]
      );
    });

    it("Throws an error when no username is passed in", async () => {
      await expect(User.create({ password: "password" })).rejects.toThrow(
        "Please provide required fields"
      );
    });

    it("Returns a new User instance", async () => {
      const mockUser = {
        username: "username",
        password: "password",
        highscore: 0,
        role: "user",
      };

      const mockArguments = { username: "username", password: "password" };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      await expect(User.create(mockArguments)).rejects.toThrow(
        "Unable to authenticate user"
      );
    });
  });

  describe("findOneByUsername", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Returns instance of User when found", async () => {
      const mockUser = {
        username: "username",
        password: "password",
        highscore: 0,
        role: "user",
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [mockUser] });

      const result = await User.findByUsername(mockUser.username);

      expect(result).toBeInstanceOf(User);
      expect(result).toHaveProperty("username", "username");
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE username = $1",
        [mockUser.username]
      );
    });

    it("Throws an error when no username is passed in", async () => {
      await expect(User.findByUsername()).rejects.toThrow(
        "Please provide a username"
      );
    });

    it("Throws an error when no user is found in the database", async () => {
      const mockUsername = "username";
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      await expect(User.findByUsername(mockUsername)).rejects.toThrow(
        "Unable to authenticate user"
      );
    });
  });

  describe("findById", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("returns a instance of User when successfull", async () => {
      const mockUser = {
        user_id: 1,
        username: "username",
        password: "password",
        highscore: 0,
        role: "user",
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [mockUser] });

      const result = await User.findById(1);

      expect(result).toBeInstanceOf(User);
      expect(result).toHaveProperty("user_id", 1);
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE user_id = $1",
        [1]
      );
    });

    it("throws an error when no id is passed in", async () => {
      await expect(User.findById()).rejects.toThrow("Please provide an id");
    });

    it("throws an error when no user is found", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      await expect(User.findById(1)).rejects.toThrow("Unable to authenticate");
    });
  });

  describe("updateHighsocre", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("returns an instance of User after updating db", async () => {
      const mockUser = {
        user_id: 1,
        username: "username",
        password: "password",
        highscore: 10,
        role: "user",
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [mockUser] });

      const user = new User(mockUser);
      const result = await user.updateHighscore(20);

      expect(result).toBeInstanceOf(User);
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(
        "UPDATE users SET highscore = $1 WHERE user_id = $2 RETURNING *",
        [20, 1]
      );
    });

    it("throws an error when no newHighscore is passed in", async () => {
      const mockUser = {
        user_id: 1,
        username: "username",
        password: "password",
        highscore: 10,
        role: "user",
      };

      const user = new User(mockUser);

      await expect(user.updateHighscore()).rejects.toThrow(
        "Please provide a new highscore"
      );
    });

    it("throws an error when query does not return a value", async () => {
      const mockUser = {
        user_id: 1,
        username: "username",
        password: "password",
        highscore: 10,
        role: "user",
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      const user = new User(mockUser);

      await expect(user.updateHighscore(10)).rejects.toThrow("DB did not return an item");
    });
  });
});
