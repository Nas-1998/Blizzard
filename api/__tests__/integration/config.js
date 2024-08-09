const { Pool } = require("pg");
const fs = require("fs");
require("dotenv").config();

//Load SQL file
const resetSQL = fs.readFileSync(__dirname + "/reset.sql").toString();

// Function to reset the test database

const resetTestDB = async () => {
  try {
    const db = new Pool({ connectionString: process.env.DB_TEST_URL });

    await db.query(resetSQL);

    await db.end();

    console.log("Test DB reset successfull");
  } catch (err) {
    console.log("Could not reset testDB", err);
    throw err;
  }
};

module.exports = { resetTestDB };
