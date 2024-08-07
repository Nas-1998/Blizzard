const express = require("express");
const request = require("supertest"); 
const app = express();
const Submission = require("../../../models/Submission");
const { create, show } = require("../../../controllers/submissions");

app.use(express.json());


app.get("/questions-stats", show);
app.post("/submissions", create);


jest.mock("../../../models/Submission");

describe("Submission Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /questions-stats", () => {
    it("should return an array of question statistics", async () => {
      const mockStats = [{ question_id: 1, question_description: "Sample question", percentage_correct: 75 }];
      Submission.getQuestionsStats.mockResolvedValue(mockStats);

      const response = await request(app).get("/questions-stats");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ stats: mockStats });
    });

    it("should handle errors", async () => {
      Submission.getQuestionsStats.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/questions-stats");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Database error" });
    });
  });

  describe("POST /submissions", () => {
    it("should create a new submission", async () => {
      const mockSubmission = { user_id: 1, question_id: 1, outcome: true };
      const createdSubmission = { ...mockSubmission, id: 1 };
      Submission.create.mockResolvedValue(createdSubmission);

      const response = await request(app)
        .post("/submissions")
        .send(mockSubmission);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ newSubmission: createdSubmission });
    });

    it("should handle errors", async () => {
      Submission.create.mockRejectedValue(new Error("Creation error"));

      const response = await request(app)
        .post("/submissions")
        .send({ user_id: 1, question_id: 1, outcome: true });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Creation error" });
    });
  });
});
