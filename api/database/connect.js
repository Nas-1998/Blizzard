const { Pool } = require("pg");

const db_url =
  process.env.NODE_ENV === "test"
    ? process.env.DB_TEST_URL
    : process.env.DB_URL;

const db = new Pool({
  connectionString: db_url,
});

module.exports = db;
