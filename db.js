const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  database: "phonebook",
  user: "postgres",
  port: 5432,
  password: "",
});

module.exports = pool;
