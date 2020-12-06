const Pool = require("pg").Pool;
require('dotenv').config()

const pool = new Pool({
  host: "ec2-54-85-13-135.compute-1.amazonaws.com",
  database: "d5vj2k1t7ho7tg",
  user: "oqiwieyditarhs",
  port: 5432,
  password: process.env.jwtSecret,
  ssl: true,
});

module.exports = pool;
