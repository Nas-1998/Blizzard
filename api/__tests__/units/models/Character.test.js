const db = require("../../../database/connect");
const Character = require("../../../models/Character");
// const Answer = require("../../../models/Answer");
// const Question = require("../../../models/Question");

describe("Character model", () => {
  describe("getOneById", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Fetchs character by id", async () => {
        const mockCharacter = {
            character_id: 1,
            character_name: "Julius Caesar",
            birth_year: -100,
            image_url: "https://simplycharly.com/wp-content/uploads/2022/07/caesar-scaled.jpeg"
          };
      const mockId = 1;

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [mockCharacter] });

      const result = await Character.getOneById(mockId);

      expect(result).toBeInstanceOf(Character);
      expect(db.query).toBeCalledWith("SELECT * FROM characters WHERE character_id = $1;",[mockId]);
    });

    it("Throws an error when no character is found", async () => {
      const mockId = 1;

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      await expect(Character.getOneById(mockId)).rejects.toThrow("Unable to locate chosen character.");

      expect(db.query).toBeCalledWith("SELECT * FROM characters WHERE character_id = $1;",[mockId]);
    });
  });

  describe("getAll", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("resolves with characters on successful db query", async () => {
        const mockCharacter = [{
            character_id: 1,
            character_name: "Julius Caesar",
            birth_year: -100,
            image_url: "https://simplycharly.com/wp-content/uploads/2022/07/caesar-scaled.jpeg"
          }];
     
         jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockCharacter });

      const characters = await Character.getAll();

      expect(characters[0]).toBeInstanceOf(Character);
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM characters;"
      );
    });

    it("Throws an Error if no characters are found", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      await expect(Character.getAll()).rejects.toThrow(
        "Unable to locate any characters."
      );
    });
  });
});
