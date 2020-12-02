const path = require("path");
const express = require("express");
const { Pool } = require("pg");
const authorize = require('../middleware/authorize')
const router = express.Router();
const pool = require("../../db");

// Get user
router.get("/:id", authorize, async (req, res) => {
   try {
     const { id } = req.params;
     const contact = await pool.query("SELECT * FROM users WHERE id = $1", [
       id,
     ]);
     res.json(contact.rows[0]);
   } catch (err) {
     console.error(err.message);
   }
 });

//user edit and delete
router.patch("/:id", authorize, async (req, res) => {
  try {
   const { id } = req.params;
   const { name, email, phone, address, city, state } = req.body;
   const updatedContact = await pool.query(
     "UPDATE users SET name = ($1), email = ($2), phone = ($3), address =($4), city=($5), state = ($6) WHERE id = $7",
     [name, email, phone, address, city, state, id]
   );
   res.json("Contact was updated");
 } catch (err) {
   console.error(err.message);
  }
});

router.delete("/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);

    res.json("User was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;