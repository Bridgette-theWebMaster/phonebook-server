require('dotenv').config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");



//registering

router.post('/register', validInfo, async (req, res) => {
    

        //destructure req.body (name, email, password)
        const {name, email, password, phone, address, city, state, picture} = req.body;
    try {
        //check if user exist
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
            email
        ])

        if (user.rows.length !== 0){
            return res.status(401).json('User already exists')
        }
        //bcrypt user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);
        //enter new user in DB
        const newUser = await pool.query("INSERT INTO users (name, email, password, phone, address, city, state, picture) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [name, email, bcryptPassword, phone, address, city, state, picture])
        
        //generating jwt token
        const jwtToken = jwtGenerator(newUser.rows[0].id)

        res.json({jwtToken})

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//login
router.post("/login", validInfo, async(req, res) => {
    try{

        // destructure req.body
        const {email, password} = req.body
        // check if user doesnt exist
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
            email
        ])

        if (user.rowCount.length === 0) {
            return res.status(401).json("Password or Email is incorrect")
        }
        // check if inputted password === db password
        const validPassword = await bcrypt.compare(password, user.rows[0].password)

        if(!validPassword) {
            return res.status(401).json("Password or Email is incorrect")
        }
        // give jwtToken
        const jwtToken = jwtGenerator(user.rows[0].id)

        res.json({ jwtToken })

    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

//verifying
router.post("/verify", authorize, async (req, res) => {
    try{ 

        res.json(true);

    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})


module.exports = router