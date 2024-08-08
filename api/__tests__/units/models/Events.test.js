const db = require("../../../database/connect");
const Event = require("../../../models/Event")


describe("Event model", () => {
    describe("show", () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });
  
      it("Return an array of instances of Events for a given character id", async () => {
        const mockEvent = {
            events_id: 1,
            characetr_id: 1,
            event_date: '2023-01-01',
            bg_image_url: '--',
            char_image_url: '-- '
        };
        jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [mockEvent] });
  
        const result = await Event.show(1);
        expect(result[0]).toBeInstanceOf(Event);
        expect(result[0].event_id).toBe(mockEvent.event_id);
        expect(result[0].character_id).toBe(mockEvent.character_id);
        expect(result[0].event_date).toBe(mockEvent.event_date);
        expect(result[0].bg_image_url).toBe(mockEvent.bg_image_url);
        expect(result[0].char_image_url).toBe(mockEvent.char_image_url);    
      });
      
it ("Throw error if no event is found", async () => {

    jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

    await  expect(Event.show(1)).rejects.toThrow("Unable to find events")
    })

    });
});
   