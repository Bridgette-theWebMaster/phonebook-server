const express = require("express");
const path = require("path");
const multer = require("multer");
const pool = require("../../db");
const router = express.Router();


const storage = multer.diskStorage({
   destination: "./public/uploads/",
   filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({
   storage: storage,
   limits:{fileSize: 2000000},
}).single("myImage");

router.put('/upload', upload, async (req, res) => {
   try {
      const { imageUrl } = req.file.path
      const uploadedImage = await pool.query("UPDATE users SET picture=($1) WHERE id = ($2) RETURNING *",
      [ imageUrl ,req.user ])
      // req.file is the `avatar` file
      // req.body will hold the text fields, if there were any
      console.log(req.protocol + '://' + req.hostname + '/' + req.file.path)
      console.log(req.file)
      res.status(204).end();
   } catch (err) {
      console.error(err.message)
   }
 })

module.exports = router;