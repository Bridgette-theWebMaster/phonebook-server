const path = require("path");
const express = require("express");
const { Pool } = require("pg");
const authorize = require('../middleware/authorize')
const router = express.Router();
const pool = require("../../db");


// Route to search for all users
router.get('/', authorize, async(req, res) => {
  try {
    const { id } = req.body
    const users = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    res.json(users.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

// Get user
router.get("/:id", authorize, async (req, res) => {
   try {
     const user = await pool.query("SELECT * FROM users WHERE id = $1", [
       req.user
     ]);
     res.json(user.rows[0]);
   } catch (err) {
     console.error(err.message);
   }
 });

//user edit and delete
router.patch("/:id", authorize, async (req, res) => {
  try {
   const { name, email, phone, address, city, state } = req.body;
   const updatedContact = await pool.query(
     "UPDATE users SET name = ($1), email = ($2), phone = ($3), address =($4), city=($5), state = ($6) WHERE id = $7",
     [name, email, phone, address, city, state, req.user]
   );
   res.json("Contact was updated");
 } catch (err) {
   console.error(err.message);
  }
});

router.delete("/:id", authorize, async (req, res) => {
  try {
    const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [
      req.user
    ]);

    res.json("User was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;