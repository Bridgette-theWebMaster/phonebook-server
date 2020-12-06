const Pool = require("pg").Pool;
require('dotenv').config()

const pool = new Pool({
  host: "localhost",//"ec2-54-85-13-135.compute-1.amazonaws.com",
  database: "phonebook",//"d5vj2k1t7ho7tg",
  user: "bridgette",//"oqiwieyditarhs",
  port: 5432,
  password: process.env.jwtSecret,
  ssl: true,
});

module.exports = pool;
