const charactersController = require("../../../controllers/character");
const Character = require("../../../models/Character");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();


const mockStatus = jest.fn(() => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd,
}));

const mockRes = { status: mockStatus };

describe("Character controller", () => {
  describe("show", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Responds with 200 code when successfull", async () => {
      const mockCharacter = {
        character_id: 1,
        character_name: "Julius Caesar",
        birth_year: -100,
        image_url: "https://simplycharly.com/wp-content/uploads/2022/07/caesar-scaled.jpeg"
      };

      const mockReq = { params: { character_id: 1 } };
      jest.spyOn(Character, "getOneById").mockResolvedValueOnce(mockCharacter);
        await charactersController.show(mockReq, mockRes);

      expect(Character.getOneById).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledTimes(1);
      expect(mockJson).toHaveBeenCalledWith(mockCharacter);
    });

    it("Responds with 404 when no character by that id is found", async () => {
      const mockReq = { params: { character_id: 2 } };

      jest.spyOn(Character, "getOneById").mockRejectedValueOnce(new Error("Error finding character"));

      await charactersController.show(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledTimes(1);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Error finding character",
      });
    });
  });
});


describe("Character controller", () => {
  describe("show", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Responds with 200 code when successfull", async () => {
      const mockCharacter = {
        character_id: 1,
        character_name: "Julius Caesar",
        birth_year: -100,
        image_url: "https://simplycharly.com/wp-content/uploads/2022/07/caesar-scaled.jpeg"
      };

      const mockReq = { params: { character_id: 1 } };
      jest.spyOn(Character, "getOneById").mockResolvedValueOnce(mockCharacter);
        await charactersController.show(mockReq, mockRes);

      expect(Character.getOneById).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledTimes(1);
      expect(mockJson).toHaveBeenCalledWith(mockCharacter);
    });

    it("Responds with 404 when no character by that id is found", async () => {
      const mockReq = { params: { character_id: 2 } };

      jest.spyOn(Character, "getOneById").mockRejectedValueOnce(new Error("Error finding character"));

      await charactersController.show(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledTimes(1);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Error finding character",
      });
    });
  });

  describe("showAll", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Responds with 200 code when successfull", async () => {
      const mockCharacter = {
        character_id: 1,
        character_name: "Julius Caesar",
        birth_year: -100,
        image_url: "https://simplycharly.com/wp-content/uploads/2022/07/caesar-scaled.jpeg"
      };

      
      jest.spyOn(Character, "getAll").mockResolvedValueOnce(mockCharacter);
        await charactersController.showAll(null, mockRes);

      expect(Character.getAll).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledTimes(1);
      expect(mockJson).toHaveBeenCalledWith(mockCharacter);
    });

    it("Responds with 404 when no character is found", async () => {
      jest.spyOn(Character, "getAll").mockRejectedValueOnce(new Error("Error finding character"));

      await charactersController.showAll(null, mockRes);

      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledTimes(1);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Error finding character",
      });
    });
  });
});