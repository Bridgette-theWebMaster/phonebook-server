const path = require("path");
const express = require("express");
const { Pool } = require("pg");
const authorize = require('../middleware/authorize')
const router = express.Router();
const pool = require("../../db");
const upload = require('../services/imageUpload')
const singleUpload = upload.single('image')


// route for client dashboard
router.get("/", authorize, async (req, res) => {
  try {
    const contact = await pool.query(
      "SELECT c.name, c.picture, c.id FROM users LEFT JOIN contacts AS c ON users.id = c.user_id WHERE users.id = $1",
      [req.user]
    );

    res.json(contact.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// route for client 'contact/:id'
router.get("/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await pool.query(
      "SELECT c.* FROM users AS u LEFT JOIN contacts AS c ON u.id = c.user_id WHERE c.id = $1 AND u.id = $2", [
      id, req.user
    ]);
    res.json(contact.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// route for client 'contact/add
// create a contact
router.post("/", authorize, async (req, res) => {
  try {
    const { name, email, phone, address, city, state, note, picture } = req.body;
    const createContact = await pool.query(
      "INSERT INTO contacts (user_id, name, email, phone, address, city, state, note, picture) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [req.user, name, email, phone, address, city, state, note, picture]
    );

    res.json(createContact.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


// route to delete contact from contacts table
// delete a contact
router.delete("/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteContact = await pool.query(
      "DELETE FROM contacts WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user]
    );
    if(deleteContact.rows.length === 0){
      return res.json("Contact does not belong to user")
    }

    res.json("Contact was deleted");
  } catch (err) {
    console.error(err.message);
  }
});


// route to update contact
// update contact
router.patch("/:id", authorize, async (req, res) => {

  try {
    const { id } = req.params;
    const { name, email, phone, address, city, state, note} = req.body;
    const updatedContact = await pool.query(
      "UPDATE contacts SET name = ($1), email = ($2), phone = ($3), address =($4), city=($5), state = ($6), note = ($7) WHERE id = $8 AND user_id = $9 RETURNING *",
      [name, email, phone, address, city, state, note, id, req.user]
    );
    if (updatedContact.rows.length === 0) {
      return res.json("Contact doesn't belong to user")
    }
    res.json("Contact was updated");
  } catch (err) {
    console.error(err.message);
  }
});
router.put(`/:id/upload`, singleUpload, authorize, async (req, res) => {
  try {
     const picture = req.file.location
     const { id } = req.params
     const uploadedPicture = await pool.query("UPDATE contacts SET picture =($1) WHERE id = $2 AND user_id = $3 RETURNING *",
        [picture, id, req.user])
        res.json(picture)
  } catch (err) {
     console.error(err.message)
  }
  
})
  

module.exports = router;
