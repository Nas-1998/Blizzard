const db = require("../../../database/connect");
const Answer = require("../../../models/Answer");
const Question = require("../../../models/Question");

describe("Question model", () => {
  describe("showByEvent", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Returns an instance of a question", async () => {
      const mockQuestion = {
        question_id: 1,
        question_description: "Mock question",
        answer_id: 1,
        event_id: 1,
        score: 10,
      };
      const mockId = 1;

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [mockQuestion] });

      const result = await Question.showByEvent(mockId);

      expect(result).toBeInstanceOf(Question);
      expect(db.query).toBeCalledWith(
        "SELECT * FROM question WHERE event_id = $1",
        [mockId]
      );
    });

    it("Throws an error when no question is found", async () => {
      const mockId = 1;

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      await expect(Question.showByEvent(mockId)).rejects.toThrow(
        "Error finding question"
      );

      expect(db.query).toBeCalledWith(
        "SELECT * FROM question WHERE event_id = $1",
        [mockId]
      );
    });
  });

  describe("getAnswers", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Returns an array of Answer instances", async () => {
      const mockQuestion = {
        question_id: 1,
        question_description: "Mock question",
        answer_id: 1,
        event_id: 1,
        score: 10,
      };
      const question = new Question(mockQuestion);

      const mockAnswers = [
        { answer_id: 1, answers: "mock1", question_id: 1 },
        { answer_id: 2, answers: "mock2", question_id: 1 },
        { answer_id: 3, answers: "mock3", question_id: 1 },
      ];

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockAnswers });

      const answers = await question.getAnswers();

      expect(answers[0]).toBeInstanceOf(Answer);
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM answers WHERE question_id = $1",
        [mockQuestion.question_id]
      );
    });

    it("Throws an Error if no Answers are found", async () => {
      const mockQuestion = {
        question_id: 1,
        question_description: "Mock question",
        answer_id: 1,
        event_id: 1,
        score: 10,
      };
      const question = new Question(mockQuestion);

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      await expect(question.getAnswers()).rejects.toThrow(
        "Error finding answers"
      );
    });
  });
});
