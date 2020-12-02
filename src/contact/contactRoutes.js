const path = require("path");
const express = require("express");
const { Pool } = require("pg");
const authorize = require('../middleware/authorize')
const router = express.Router();
const pool = require("../../db");

// route for client dashboard
router.get("/", authorize, async (req, res) => {
  try {
    const contact = await pool.query("SELECT * FROM contacts");

    res.json(contact.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// route for client 'contact/:id'
router.get("/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await pool.query("SELECT * FROM contacts WHERE id = $1", [
      id,
    ]);
    res.json(contact.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// route for client 'contact/add
router.post("/", authorize, async (req, res) => {
  try {
    const { user_id, name, email, phone, address, city, state, note } = req.body;
    const createContact = await pool.query(
      "INSERT INTO contacts (user_id, name, email, phone, address, city, state, note) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [user_id, name, email, phone, address, city, state, note]
    );

    res.json(createContact.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// route to delete contact from contacts table
router.delete("/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteContact = await pool.query(
      "DELETE FROM contacts WHERE id = $1",
      [id]
    );

    res.json("Contact was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

// route to update contact
router.patch("/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, city, state, note } = req.body;
    const updatedContact = await pool.query(
      "UPDATE contacts SET name = ($1), email = ($2), phone = ($3), address =($4), city=($5), state = ($6), note = ($7) WHERE id = $8",
      [name, email, phone, address, city, state, note, id]
    );
    res.json("Contact was updated");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
