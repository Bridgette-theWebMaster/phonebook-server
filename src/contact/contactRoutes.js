const path = require("path");
const express = require("express");
const { Pool } = require("pg");

const router = express.Router();
const pool = require("../../db");

// route for client dashboard
router.get("/", async (req, res) => {
  try {
    const contact = await pool.query("SELECT * FROM contacts");

    res.json(contact.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// route for client 'contact/:id'
router.get("/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
  try {
    const { user_id, name, email, phone, street, zip, note } = req.body;
    const createContact = await pool.query(
      "INSERT INTO contacts (user_id, name, email, phone, street, zip, note) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [user_id, name, email, phone, street, zip, note]
    );

    res.json(createContact.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// route to delete contact from contacts table
router.delete("/:id", async (req, res) => {
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
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, street, zip, note } = req.body;
    const updatedContact = await pool.query(
      "UPDATE contacts SET name = ($1), email = ($2), phone = ($3), street = ($4), zip = ($5), note = ($6) WHERE id = $7",
      [name, email, phone, street, zip, note, id]
    );
    res.json("Contact was updated");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
