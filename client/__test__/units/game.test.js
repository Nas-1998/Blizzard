const gameState = require("../../assets/gameLogic/logic");

describe("gameState Class Unit Tests", () => {
  let mockGame;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGame = new gameState();
  });

  describe("Initialization", () => {
    it("should initialize the game with default values", () => {
      expect(mockGame.user_highscore).toBe(0);
      expect(mockGame.score).toBe(0);
      expect(mockGame.question).toEqual({});
      expect(mockGame.character).toEqual({});
      expect(mockGame.lives).toBe(3);
      expect(mockGame.event).toEqual([]);
      expect(mockGame.eventIndex).toBe(0);
      expect(mockGame.state).toBe("beforeInit");
    });
  });

  describe("checkGameState", () => {
    it("should update state to lost when lives are 0", () => {
      mockGame.lives = 0;
      mockGame.checkGameState();
      expect(mockGame.state).toBe("lost");
    });

    it("should update state to won when all events are processed", () => {
      mockGame.event = [{}, {}];
      mockGame.eventIndex = 2;
      mockGame.checkGameState();
      expect(mockGame.state).toBe("won");
    });

    it("should not change state when the game is still in progress", () => {
      mockGame.state = "running";
      mockGame.event = [{}, {}];
      mockGame.eventIndex = 1;
      mockGame.checkGameState();
      expect(mockGame.state).toBe("running");
    });
  });

  describe("fetchNextQuestion", () => {
    it("should return -1 if all events are processed", async () => {
      mockGame.event = [{}, {}];
      mockGame.eventIndex = 2;

      const result = await mockGame.fetchNextQuestion();

      expect(result).toBe(-1);
    });

    it("should fetch the next question if events are not fully processed", async () => {
      mockGame.event = [{ event_id: 1 }, { event_id: 2 }];
      mockGame.eventIndex = 0;

      const mockQuestion = { question_id: 1 };
      jest.spyOn(mockGame, 'fetchForQuestions').mockResolvedValue(mockQuestion);
      mockGame.question = mockQuestion;

      const result = await mockGame.fetchNextQuestion();

      expect(mockGame.fetchForQuestions).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockQuestion);
    });
  });

  describe("fetchForCharacter", () => {
    it("should fetch character data and update character", async () => {
      const mockData = { character_id: 1, name: "Julius Caesar" };
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      await mockGame.fetchForCharacter(1);

      expect(global.fetch).toHaveBeenCalledWith(
        "https://blizzard-5jur.onrender.com/characters/1"
      );
      expect(mockGame.character).toEqual(mockData);
    });

    it("should handle fetch errors", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 404,
      });
      console.error = jest.fn();

      await mockGame.fetchForCharacter(1);

      expect(console.error).toHaveBeenCalledWith(new Error("Error: 404"));
    });
  });

  describe("fetchForEvents", () => {
    it("should fetch events data and update event", async () => {
      const mockData = [{ event_id: 1 }, { event_id: 2 }];
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      await mockGame.fetchForEvents(1);

      expect(global.fetch).toHaveBeenCalledWith(
        "https://blizzard-5jur.onrender.com/events/1"
      );
      expect(mockGame.event).toEqual(mockData);
    });

    it("should handle fetch errors", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 404,
      });
      console.error = jest.fn();

      await mockGame.fetchForEvents(1);

      expect(console.error).toHaveBeenCalledWith(new Error("Error: 404"));
    });
  });

  describe("fetchForQuestions", () => {
    it("should fetch questions data and update question", async () => {
      const mockData = { question_id: 1, description: "Question 1" };
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      await mockGame.fetchForQuestions(1);

      expect(global.fetch).toHaveBeenCalledWith(
        "https://blizzard-5jur.onrender.com/questions/1"
      );
      expect(mockGame.question).toEqual(mockData);
    });

    it("should handle fetch errors", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 404,
      });
      console.error = jest.fn();

      await mockGame.fetchForQuestions(1);

      expect(console.error).toHaveBeenCalledWith(new Error("Error: 404"));
    });
  });

  describe("checkForHighScore", () => {
    it("should call sendHighscore if current score is greater than user_highscore", async () => {
      mockGame.score = 200;
      mockGame.user_highscore = 100;
      jest.spyOn(mockGame, 'sendHighscore').mockResolvedValue();

      await mockGame.checkForHighScore();

      expect(mockGame.sendHighscore).toHaveBeenCalled();
    });

    it("should not call sendHighscore if current score is not greater than user_highscore", async () => {
      mockGame.score = 50;
      mockGame.user_highscore = 100;
      jest.spyOn(mockGame, 'sendHighscore').mockResolvedValue();

      await mockGame.checkForHighScore();

      expect(mockGame.sendHighscore).not.toHaveBeenCalled();
    });
  });
});
