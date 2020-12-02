const Pool = require("pg").Pool;
require('dotenv').config()

const pool = new Pool({
  host: "localhost",
  database: "phonebook",
  user: "bridgette",
  port: 5432,
  password: process.env.jwtSecret,
});

module.exports = pool;
