const gameState = require("../../assets/gameLogic/logic");
require("../utils/mockConsole");
require("../utils/mockLocalStorage");

const remoteAPI = "https://blizzard-5jur.onrender.com";

mockJson = jest.fn();
global.fetch = jest.fn(() => {
  return {
    ok: true,
    status: 200,
    json: mockJson,
  };
});

const mockCharacter = {
  character_id: 1,
  character_name: "Julius Caesar",
  birth_year: -100,
  image_url:
    "https://simplycharly.com/wp-content/uploads/2022/07/caesar-scaled.jpeg",
};

const mockEvents = [
  {
    event_id: 1,
    character_id: 1,
    event_date: "60 BCE",
    bg_image_url:
      "https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event1-bg.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQxLWJnLmpwZyIsImlhdCI6MTcyMzA0MzQzNSwiZXhwIjoxNzU0NTc5NDM1fQ.IyHbl924DSoEz2Kw_Zar89QugWH6obw_mWYYbjt4JhI&t=2024-08-07T15%3A10%3A35.686Z",
    char_image_url:
      "https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event1-char.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQxLWNoYXIucG5nIiwiaWF0IjoxNzIzMDQzNDQ2LCJleHAiOjE3NTQ1Nzk0NDZ9.RzjHSALckItmrJdPnCYt3_MoadO12yNJfnr0o5z45-k&t=2024-08-07T15%3A10%3A46.883Z",
  },
  {
    event_id: 2,
    character_id: 1,
    event_date: "58 BCE",
    bg_image_url:
      "https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event2-bg.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQyLWJnLmpwZyIsImlhdCI6MTcyMzA0MzQ1NywiZXhwIjoxNzU0NTc5NDU3fQ.NUkGFFUWfk_wDZyZCJAeJ9VnHZsWzZniL5y3Kk6CSuQ&t=2024-08-07T15%3A10%3A57.944Z",
    char_image_url:
      "https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event2-char.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQyLWNoYXIucG5nIiwiaWF0IjoxNzIzMDQzNDY1LCJleHAiOjE3NTQ1Nzk0NjV9.SZPoN7vB43thRXWnAPOWxi4LwwSbtoQmA0pdr6x1dws&t=2024-08-07T15%3A11%3A05.840Z",
  },
  {
    event_id: 3,
    character_id: 1,
    event_date: "49BCE",
    bg_image_url:
      "https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event3-bg.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQzLWJnLmpwZyIsImlhdCI6MTcyMzA0MzQ3NCwiZXhwIjoxNzU0NTc5NDc0fQ.YX06v0-Y59ZizB9XvI3VFS3DR894Of1S7oOF4UcnAzg&t=2024-08-07T15%3A11%3A14.088Z",
    char_image_url:
      "https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event3-char.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQzLWNoYXIucG5nIiwiaWF0IjoxNzIzMDQzNTA2LCJleHAiOjE3NTQ1Nzk1MDZ9.Zlx5lUPwPgEzT7_Y6zCO05qZGjuxQdgqWTCQLZ19bn8&t=2024-08-07T15%3A11%3A46.420Z",
  },
  {
    event_id: 4,
    character_id: 1,
    event_date: "48BCE",
    bg_image_url:
      "https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event4-bg.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQ0LWJnLmpwZyIsImlhdCI6MTcyMzA0MzUxOSwiZXhwIjoxNzU0NTc5NTE5fQ.5vYey4QklrrjnuvjULPmkZ3ogc6W40XH2FbS5oxteOA&t=2024-08-07T15%3A11%3A58.943Z",
    char_image_url:
      "https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event4-char.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQ0LWNoYXIucG5nIiwiaWF0IjoxNzIzMDQzNTQ5LCJleHAiOjE3NTQ1Nzk1NDl9.z12VRSt8-sPWPkAs-CAOXBAOH3zb6lsFfubvWSM9xZo&t=2024-08-07T15%3A12%3A29.429Z",
  },
  {
    event_id: 5,
    character_id: 1,
    event_date: "44BCE",
    bg_image_url:
      "https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event5-bg.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQ1LWJnLmpwZyIsImlhdCI6MTcyMzA0MzU3NywiZXhwIjoxNzU0NTc5NTc3fQ.HwrFqBhM0Aa_KsKxFyPwlxKSo6gQ3RiOCi5Dl6MW7G8&t=2024-08-07T15%3A12%3A57.831Z",
    char_image_url:
      "https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event5-char.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQ1LWNoYXIucG5nIiwiaWF0IjoxNzIzMDQzNTg1LCJleHAiOjE3NTQ1Nzk1ODV9.u09rOElTp5ca_Olatg92mQBCQCFQHJA8Y4bQtrc3VGc&t=2024-08-07T15%3A13%3A05.521Z",
  },
  {
    event_id: 6,
    character_id: 1,
    event_date: "44BCE",
    bg_image_url:
      "https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event6-bg.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQ2LWJnLmpwZyIsImlhdCI6MTcyMzA0MzU5NCwiZXhwIjoxNzU0NTc5NTk0fQ.Mg0RKvxo_i09fiyjofCINy5hasRv31Y5D0WGNBMlCQg&t=2024-08-07T15%3A13%3A14.318Z",
    char_image_url:
      "https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event6-char.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQ2LWNoYXIucG5nIiwiaWF0IjoxNzIzMDQzNjA0LCJleHAiOjE3NTQ1Nzk2MDR9.EzEeG0pfQfuMGgYjKNJ3fd9Lut4SOj5SuNO1ubCEXV4&t=2024-08-07T15%3A13%3A23.886Z",
  },
];

const mockQuestion = {
  question_id: 1,
  question_description:
    "It is 60 BCE, Rome conflicts with itself, various leaders looking to seize control for themselves. Ceaser comes up with a plan to form an alliance with another leader to boost his own power and control over the empire, some leaders which Ceaser looks to are Pompey the great and Crassus.",
  answer_id: 1,
  event_id: 1,
  score: 10,
  answers: [
    {
      answer_id: 1,
      answers:
        "Side with Pompey, that way he gains further military power through his help.",
    },
    {
      answer_id: 2,
      answers:
        "Form an alliance with Crassus to gain further wealth and influence over the land, allowing him to garner further support later.",
    },
    {
      answer_id: 3,
      answers:
        "Take the chance in forming an alliance with both men which could be risky.",
    },
  ],
};

describe("gameState", () => {
  describe("init", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("calls fetchForUser, fetchForCharacter, fetchForEvents,fetchForQuestion", async () => {
      const mockGame = new gameState();

      jest.spyOn(gameState.prototype, "fetchForUser").mockReturnValueOnce("");
      jest
        .spyOn(gameState.prototype, "fetchForCharacter")
        .mockReturnValueOnce("");

      mockGame.character = { ...mockCharacter };
      jest.spyOn(gameState.prototype, "fetchForEvents").mockReturnValueOnce("");

      mockGame.event = { ...mockEvents };

      jest
        .spyOn(gameState.prototype, "fetchForQuestions")
        .mockReturnValueOnce("");
      mockGame.question = { ...mockQuestion };

      await mockGame.init(mockCharacter.character_id);

      expect(gameState.prototype.fetchForUser).toHaveBeenCalledTimes(1);
      expect(gameState.prototype.fetchForCharacter).toHaveBeenCalledTimes(1);
      expect(gameState.prototype.fetchForCharacter).toHaveBeenCalledWith(
        mockGame.character.character_id
      );
      expect(gameState.prototype.fetchForEvents).toHaveBeenCalledTimes(1);
      expect(gameState.prototype.fetchForEvents).toHaveBeenCalledWith(
        mockGame.character.character_id
      );
      expect(gameState.prototype.fetchForQuestions).toHaveBeenCalledTimes(1);
      expect(mockGame.state).toBe("running");
    });
  });

  describe("checkGameState", () => {
    it("updates instance state to lost when this.lives == 0", () => {
      const mockGame = new gameState();
      mockGame.lives = 0;

      mockGame.checkGameState();

      expect(mockGame.state).toBe("lost");
    });

    it("updates instance state to won no more questions", () => {
      const mockGame = new gameState();
      mockGame.event = [{}, {}];
      mockGame.eventIndex = 2;

      mockGame.checkGameState();

      expect(mockGame.state).toBe("won");
    });
  });

  describe("checkForAnswers", () => {
    it("increases score when correct", () => {
      const mockGame = new gameState();
      mockGame.eventIndex = 0;
      mockGame.score = 10;
      mockGame.question = { answer_id: 1, score: 10 };

      mockGame.checkForAnswers(1);

      expect(mockGame.score).toBe(20);
      expect(mockGame.eventIndex).toBe(1);
    });

    it("decreases lives when incorrect", () => {
      const mockGame = new gameState();
      mockGame.eventIndex = 0;
      mockGame.lives = 3;
      mockGame.question = { answer_id: 1, score: 10 };

      mockGame.checkForAnswers(2);

      expect(mockGame.lives).toBe(2);
      expect(mockGame.eventIndex).toBe(1);
    });
  });

  describe("fetchForQuestions", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Updates instance question when successfull", async () => {
      const mockGame = new gameState();
      fetch.mockResolvedValueOnce({ json: mockJson, ok: true });
      mockJson.mockResolvedValueOnce("mockReturn");

      await mockGame.fetchForQuestions(1);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`${remoteAPI}/questions/1`);
      expect(mockJson).toHaveBeenCalledTimes(1);
      expect(mockGame.question).toBe("mockReturn");
    });

    it("Throws error when response.ok === false", async () => {
      const mockGame = new gameState();
      const mockError = new Error("Error: " + 404);
      fetch.mockResolvedValueOnce({ json: mockJson, ok: false, status: 404 });

      await mockGame.fetchForQuestions(1);

      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(mockError);
    });

    it("console logs error when fetch fails", async () => {
      const mockGame = new gameState();
      const mockError = new Error("Error thrown by fetch");
      fetch.mockRejectedValueOnce(mockError);

      await mockGame.fetchForQuestions(1);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`${remoteAPI}/questions/1`);
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(mockError);
    });
  });

  describe("fetchForEvents", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Updates instance Events when successfull", async () => {
      const mockGame = new gameState();
      const mockEvent = [mockEvents];

      const mockJson = jest.fn().mockResolvedValueOnce(mockEvent);
      fetch.mockResolvedValueOnce({ json: mockJson, ok: true });

      await mockGame.fetchForEvents(1);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`${remoteAPI}/events/1`);
      expect(mockJson).toHaveBeenCalledTimes(1);
      expect(mockGame.event).toBe(mockEvent);
    });

    it("Console logs error when fetch fails", async () => {
      const mockGame = new gameState();

      fetch.mockRejectedValueOnce("Error from fetch");

      await mockGame.fetchForEvents(1);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith("Error from fetch");
    });

    it("throws error when response.ok === false", async () => {
      const mockGame = new gameState();
      const mockError = new Error("Error: 404");
      fetch.mockResolvedValueOnce({ status: 404, ok: false });

      await mockGame.fetchForEvents(1);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`${remoteAPI}/events/1`);
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(mockError);
    });
  });

  describe("fetchForCharacters", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Updates instance character when successfull", async () => {
      const mockGame = new gameState();
      const mockFetchedCharacter = { ...mockCharacter };

      const mockJson = jest.fn().mockResolvedValueOnce(mockFetchedCharacter);
      fetch.mockResolvedValueOnce({ json: mockJson, ok: true });

      await mockGame.fetchForCharacter(1);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`${remoteAPI}/characters/1`);
      expect(mockJson).toHaveBeenCalledTimes(1);
      expect(mockGame.character).toBe(mockFetchedCharacter);
    });

    it("Console logs error when fetch fails", async () => {
      const mockGame = new gameState();

      fetch.mockRejectedValueOnce("Error from fetch");

      await mockGame.fetchForCharacter(1);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`${remoteAPI}/characters/1`);
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith("Error from fetch");
    });

    it("throws error when response.ok === false", async () => {
      const mockGame = new gameState();
      const mockError = new Error("Error: 404");
      fetch.mockResolvedValueOnce({ status: 404, ok: false });

      await mockGame.fetchForCharacter(1);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`${remoteAPI}/characters/1`);
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(mockError);
    });
  });

  describe("fetchForUsers", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      localStorage.getItem.mockReturnValueOnce("123");
    });

    it("Updates instance highscore when successfull", async () => {
      const mockGame = new gameState();
      const mockFetchJson = { highscore: 10 };

      const mockOptions = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "123",
        },
      };

      const mockJson = jest.fn().mockResolvedValueOnce(mockFetchJson);
      fetch.mockResolvedValueOnce({ json: mockJson, ok: true });

      await mockGame.fetchForUser();

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${remoteAPI}/users/stats`,
        mockOptions
      );
      expect(mockJson).toHaveBeenCalledTimes(1);
      expect(mockGame.user_highscore).toBe(10);
    });

    it("Console logs error when fetch fails", async () => {
      const mockGame = new gameState();

      const mockOptions = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "123",
        },
      };

      fetch.mockRejectedValueOnce("Error from fetch");

      await mockGame.fetchForUser();

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${remoteAPI}/users/stats`,
        mockOptions
      );
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith("Error from fetch");
    });

    it("throws error when response.ok === false", async () => {
      const mockGame = new gameState();
      const mockError = new Error("Error: 404");

      const mockOptions = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "123",
        },
      };

      fetch.mockResolvedValueOnce({ status: 404, ok: false });

      await mockGame.fetchForUser();

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${remoteAPI}/users/stats`,
        mockOptions
      );
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(mockError);
    });
  });

  describe("sendSubmission", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      localStorage.getItem.mockReturnValueOnce("123");
    });

    it("Fetch Post request", async () => {
      const mockGame = new gameState();
      mockGame.question = { question_id: 1 };

      const mockOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "123",
        },
        body: JSON.stringify({
          question_id: mockGame.question.question_id,
          outcome: true,
        }),
      };

      fetch.mockResolvedValueOnce({ json: mockJson, ok: true });

      await mockGame.sendSubmission(true);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${remoteAPI}/submissions/`,
        mockOptions
      );
    });

    it("Console logs error when fetch fails", async () => {
      const mockGame = new gameState();
      mockGame.question = { question_id: 1 };

      const mockOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "123",
        },
        body: JSON.stringify({
          question_id: mockGame.question.question_id,
          outcome: true,
        }),
      };

      const mockError = new Error("Error submitting the answer");
      fetch.mockResolvedValueOnce({ ok: false });

      await mockGame.sendSubmission(true);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${remoteAPI}/submissions/`,
        mockOptions
      );
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(mockError);
    });
  });
});
