const db = require("../database/connect");

class Event {
  constructor({
    event_id,
    character_id,
    event_date,
    bg_image_url,
    char_image_url,
  }) {
    this.event_id = event_id;
    this.character_id = character_id;
    this.event_date = event_date;
    this.bg_image_url = bg_image_url;
    this.char_image_url = char_image_url;
  }

  static async show(character_id) {
    const events = await db.query(
      "SELECT * FROM events WHERE character_id = $1 ORDER BY event_id",
      [character_id]
    );

    if (events.rows.length === 0) throw new Error("Unable to find events");

    return events.rows.map((e) => new Event(e));
  }
}

module.exports = Event;
