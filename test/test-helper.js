const express = require("express");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../src/config");

const userArr = [
  {
    id: 1,
    name: "Test",
    email: "Test@testing.com",
    password: "Burgerz",
  },
  {
    id: 2,
    name: "Linda",
    email: "Linda@testing.com",
    password: "$2b$10$1wrgb118.ic1ZC.O3.ocpeOaVbaT44hIszpgAB5Ol9fUi1g9P0q5.",
  },
];

function cleanTable(db) {
  return db.raw(
    `TRUNCATE
            users
            RESTART IDENTITY CASCADE`
  );
}

function makeAuthHeader(email, jwtSecret = process.env.jwtSecret) {
  const token = jwt.sign({ id: user.id }, jwtSecret, {
    subject: email,
    algorithm: "HS256",
  });
  return `Bearer ${token}`;
}

module.exports = {
  userArr,
  cleanTable,
  makeAuthHeader,
};
