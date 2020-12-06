const Pool = require("pg").Pool;
require('dotenv').config()
const config = require('../config');

const pool = new Pool({
  host: "ec2-54-85-13-135.compute-1.amazonaws.com",//"localhost",
  database: "d5vj2k1t7ho7tg",//"phonebook",
  user: "oqiwieyditarhs",//"bridgette",
  port: 5432,
  password: config.jwtSecret,
  ssl: true,
});

module.exports = pool;
