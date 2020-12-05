const express = require('express')
const pool = require('../../db')
const router = express.Router()
const authorize = require('../middleware/authorize')
const upload = require('../services/imageUpload')
const singleUpload = upload.single('image')

router.put(`/upload`, singleUpload, authorize, async (req, res) => {
   try {
      const picture = req.file.location
      const uploadedPicture = await pool.query("UPDATE users SET picture =($1) WHERE id = $2 RETURNING *",
         [picture, req.user])
         res.json(picture)
   } catch (err) {
      console.error(err.message)
   }
   
})
/*
router.post("/", authorize, async (req, res) => {
   try {
     const { name, email, phone, address, city, state, note } = req.body;
     const createContact = await pool.query(
       "INSERT INTO contacts (user_id, name, email, phone, address, city, state, note) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
       [req.user, name, email, phone, address, city, state, note]
     );
 
     res.json(createContact.rows[0]);
   } catch (err) {
     console.error(err.message);
   }
 });
router.post(`/upload`,function(req, res) {
   singleUpload(req, res, function (err) {
      if (err) {
         return res.status(422).send({errors : [{title: `Image upload error`, detail: err.message}]})
      }
      const image = req.file.location
      const uploadedImage = pool.query("INSERT INTO users (picture) VALUES ($1) WHERE id = $2",
         [image, req.user])
         res.json('image uploaded')
   })
})*/

module.exports = router