const Pool = require("pg").Pool

const pool = new Pool({
    host: "localhost",
    database: "phonebook",
    user: "bridgette",
    port: 5432,
    password: "Renly2357",
});

module.exports = pool;