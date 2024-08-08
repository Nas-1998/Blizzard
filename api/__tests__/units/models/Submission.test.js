<<<<<<< HEAD
const Submission = require('../../../models/Submission');
const db = require('../../../database/connect');

// Mocking the database query function
jest.mock('../../../database/connect');

describe('Submission Model', () => {
=======
const Submission = require("../../../models/Submission");
const db = require("../../../database/connect");

// Mocking the database query function
jest.mock("../../../database/connect");

describe("Submission Model", () => {
>>>>>>> c67f8d68c34cd61e938c607194890b10a1f10cfc
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
  });

<<<<<<< HEAD
  describe('create', () => {
    it('should create a new submission and return a Submission instance', async () => {
      // Mocking the db.query method
      db.query.mockResolvedValueOnce({
        rows: [{
          user_id: 1,
          question_id: 1,
          outcome: true,
          submission_id: 1
        }]
=======
  describe("create", () => {
    it("should create a new submission and return a Submission instance", async () => {
      // Mocking the db.query method
      jest.spyOn(db, "query").mockResolvedValueOnce({
        rows: [
          {
            user_id: 1,
            question_id: 1,
            outcome: true,
            submission_id: 1,
          },
        ],
>>>>>>> c67f8d68c34cd61e938c607194890b10a1f10cfc
      });

      const submissionData = {
        question_id: 1,
        user_id: 1,
<<<<<<< HEAD
        outcome: true
=======
        outcome: true,
>>>>>>> c67f8d68c34cd61e938c607194890b10a1f10cfc
      };

      const submission = await Submission.create(submissionData);

      expect(submission).toBeInstanceOf(Submission);
      expect(submission.user_id).toBe(1);
      expect(submission.question_id).toBe(1);
      expect(submission.outcome).toBe(true);
      expect(submission.submission_id).toBe(1);
    });

<<<<<<< HEAD
    it('should throw an error if the creation fails', async () => {
      // Mocking the db.query method to simulate a failure
      db.query.mockResolvedValueOnce({
        rows: []
=======
    it("should throw an error if the creation fails", async () => {
      // Mocking the db.query method to simulate a failure
      db.query.mockResolvedValueOnce({
        rows: [],
>>>>>>> c67f8d68c34cd61e938c607194890b10a1f10cfc
      });

      const submissionData = {
        question_id: 1,
        user_id: 1,
<<<<<<< HEAD
        outcome: true
      };

      await expect(Submission.create(submissionData))
        .rejects
        .toThrow('Error creating new submission');
    });
  });

  describe('getQuestionsStats', () => {
    it('should return question statistics', async () => {
=======
        outcome: true,
      };

      await expect(Submission.create(submissionData)).rejects.toThrow(
        "Error creating new submission"
      );
    });
  });

  describe("getQuestionsStats", () => {
    it("should return question statistics", async () => {
>>>>>>> c67f8d68c34cd61e938c607194890b10a1f10cfc
      // Mocking the db.query method
      db.query.mockResolvedValueOnce({
        rows: [
          {
            question_id: 1,
<<<<<<< HEAD
            question_description: 'Sample Question',
            percentage_correct: 75
          }
        ]
=======
            question_description: "Sample Question",
            percentage_correct: 75,
          },
        ],
>>>>>>> c67f8d68c34cd61e938c607194890b10a1f10cfc
      });

      const stats = await Submission.getQuestionsStats();

      expect(stats).toHaveLength(1);
      expect(stats[0].question_id).toBe(1);
<<<<<<< HEAD
      expect(stats[0].question_description).toBe('Sample Question');
      expect(stats[0].percentage_correct).toBe(75);
    });

    it('should throw an error if fetching stats fails', async () => {
      // Mocking the db.query method to simulate a failure
      db.query.mockRejectedValueOnce(new Error('Database query failed'));

      await expect(Submission.getQuestionsStats())
        .rejects
        .toThrow('Error fetching stats');
    });
  });
});

=======
      expect(stats[0].question_description).toBe("Sample Question");
      expect(stats[0].percentage_correct).toBe(75);
    });

    it("should throw an error if fetching stats fails", async () => {
      // Mocking the db.query method to simulate a failure
      jest
        .spyOn(db, "query")
        .mockRejectedValueOnce(new Error("Database query failed"));

      await expect(Submission.getQuestionsStats()).rejects.toThrow(
        "Database query failed"
      );
    });
  });
});
>>>>>>> c67f8d68c34cd61e938c607194890b10a1f10cfc
