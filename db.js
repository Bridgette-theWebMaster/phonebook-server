const Pool = require("pg").Pool;
require('dotenv').config()
const config = require('./src/config');

const pool = new Pool({
  host: "ec2-54-85-13-135.compute-1.amazonaws.com",//"localhost",
  database: "d5vj2k1t7ho7tg",//"phonebook",
  user: "oqiwieyditarhs",//"bridgette",
  port: 5432,
  password: "045b3aa90fd9d98874be76d8ae6c34008d8f2b7920509c156bd97abf2af7ab67",
});

module.exports = pool;
