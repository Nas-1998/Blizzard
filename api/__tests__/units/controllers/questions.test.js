const Answer = require("../../../models/Answer");
const Question = require("../../../models/Question");
const questionsController = require("../../../controllers/questions");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();
const mockStatus = jest.fn(() => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd,
}));
const mockRes = { status: mockStatus };

describe("questions controller", () => {
  describe("show", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Responds with 200 code when successfull", async () => {
      const mockQuestion = {
        question_id: 1,
        question_description: "Mock description.",
        answer_id: 1,
        event_id: 1,
        score: 10,
      };

      const mockAnswers = [
        {
          answer_id: 1,
          question_id: 1,
          answers_text:
            "Side with Pompey, that way he gains further military power through his help.",
        },
        {
          answer_id: 2,
          question_id: 1,
          answer_text:
            "Form an alliance with Crassus to gain further wealth and influence over the land, allowing him to garner further support later.",
        },
        {
          answer_id: 3,
          question_id: 1,
          answer_text:
            "Take the chance in forming an alliance with both men which could be risky.",
        },
      ].map((a) => new Answer(a));

      const mockReq = { params: { eventId: 1 } };
      jest
        .spyOn(Question, "showByEvent")
        .mockResolvedValueOnce(new Question(mockQuestion)),
        jest
          .spyOn(Question.prototype, "getAnswers")
          .mockResolvedValueOnce(mockAnswers),
        await questionsController.show(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledTimes(1);
      expect(mockJson).toHaveBeenCalledWith({
        ...mockQuestion,
        answers: mockAnswers,
      });
    });

    it("Responds with 404 when no question is found", async () => {
      const mockReq = { params: { eventId: 1 } };

      jest
        .spyOn(Question, "showByEvent")
        .mockRejectedValueOnce(new Error("Error finding question"));

      await questionsController.show(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledTimes(1);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Error finding question",
      });
    });
  });
});
