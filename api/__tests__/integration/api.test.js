const { resetTestDB } = require("./config.js");
const request = require("supertest");
require("dotenv").config();
const bcrypt = require("bcrypt");
const app = require("../../app.js");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.js");

describe("Game API endpoints", () => {
  let api;

  beforeAll(() => {
    api = app.listen(5000, () => {
      console.log("Test server running on port 5000");
    });
  });

  //Close our test App
  afterAll((done) => {
    api.close(done);
  });

  describe("ROOT /", () => {
    beforeEach(async () => {
      await resetTestDB();
    });
    it("responds to GET / with a name and description", async () => {
      //Arrange & Act
      const response = await request(api).get("/");

      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe("History game");
      expect(response.body.description).toBe(
        "Learn by being an advisor to the great figures of history"
      );
    });
  });

  describe("/characters", () => {
    beforeEach(async () => {
      await resetTestDB();
    });

    it("Responds GET / with a 200 code of an Array", async () => {
      const response = await request(api).get("/characters/");

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body).toBeInstanceOf(Array);
    });

    it("GET /1 with a 200 code with Julius Ceasers character", async () => {
      const response = await request(api).get("/characters/1");

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("character_name", "Julius Caesar");
    });

    it("GET /:id responds with 404 when no character is found", async () => {
      const response = await request(api).get("/characters/4");

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty(
        "error",
        "Unable to locate chosen character."
      );
    });
  });

  describe("/questions", () => {
    beforeEach(async () => {
      await resetTestDB();
    });

    it("responds to GET /questions with question with the id", async () => {
      const response = await request(api).get("/questions/1");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("question_id", 1);
    });

    it("responds to GET /questions with a 404", async () => {
      const response = await request(api).get("/questions/5");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error", "Error finding question");
    });
  });

  describe("/events", () => {
    beforeEach(async () => {
      await resetTestDB();
    });

    it("responds to GET /1 with a 200 and an Event", async () => {
      const response = await request(api).get("/events/1");

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body).toBeInstanceOf(Array);
    });

    it("responds to GET /5 with a 404 when character does not exist", async () => {
      const response = await request(api).get("/events/5");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("err", "Unable to find events");
    });
  });

  describe("/users", () => {
    it("responds to POST /signup with a 201 and a jwt token", async () => {
      const response = await request(api).post("/users/signup").send({
        username: "mockUser",
        password: "mockPassword",
      });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("token");
    });

    it("responds to POST /signup with a 500 when no user or password is passed in", async () => {
      const response = await request(api).post("/users/signup").send({
        username: "mockUser",
      });
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
    });

    it("responds to POST /login with a 201 and a jwt token", async () => {
      const mockUser = new User({
        user_id: 1,
        username: "mockUser",
        password: "encrypted",
        highscore: 10,
        role: "user",
      });

      jest
        .spyOn(jwt, "sign")
        .mockImplementation(
          (payload, secretOrPrivateKey, options, callback) => {
            // Directly call the callback with a mocked token
            if (typeof callback === "function") {
              callback(false, "mockToken");
            }
          }
        ),
        jest.spyOn(User, "findByUsername").mockResolvedValueOnce(mockUser);
      jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true);

      const response = await request(api).post("/users/login").send({
        username: "mockUser",
        password: "mockPassword",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token", "mockToken");
    });

    it("responds to POST /login with a 404 when user is not found", async () => {
      jest
        .spyOn(User, "findByUsername")
        .mockRejectedValueOnce({ message: "Unable to authenticate" });

      const response = await request(api).post("/users/login").send({
        username: "mockUser",
        password: "mockPassword",
      });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error", "Unable to authenticate");
    });

    it("responds to POST /login with a 500 when error generating token", async () => {
      const mockUser = new User({
        user_id: 1,
        username: "mockUser",
        password: "encrypted",
        highscore: 10,
        role: "user",
      });

      jest.spyOn(User, "findByUsername").mockResolvedValueOnce(mockUser);
      jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true);
      jest
        .spyOn(jwt, "sign")
        .mockImplementation(
          (payload, secretOrPrivateKey, options, callback) => {
            // Directly call the callback with a mocked token
            if (typeof callback === "function") {
              callback(true, null);
            }
          }
        );

      const response = await request(api).post("/users/login").send({
        username: "mockUser",
        password: "mockPassword",
      });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error", "Error generating token");
    });
  });
});
