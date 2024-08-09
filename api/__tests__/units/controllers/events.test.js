const eventsController = require("../../../controllers/events")
const Event = require("../../../models/Event")

req = { params: { characterId: 1 } };
res = {
   status: jest.fn().mockReturnThis(),
   json: jest.fn()
};

describe("events controller", () => {
    describe("index", () => {
      beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Responds with 200 code when successfull", async () => {
        const mockEvents = [{            
            events_id: 1,
            characetr_id: 1,
            event_date: '2023-01-01',
            bg_image_url: '--',
            char_image_url: '-- '
      }];
      jest.spyOn(Event, 'show').mockResolvedValueOnce(mockEvents);

      await eventsController.index(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockEvents);
    });

    it("Responds with 404 code when rejected", async () => {
        jest.spyOn(Event, 'show').mockRejectedValueOnce(new Error("Error unable to find event"));

        await eventsController.index(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({
            err: "Error unable to find event"})
    })
});
});