//express mysql path cors bcrypt jsonwebtoken cookie parser multer fs
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//TODO -seperate the enviromental stuff



const db = require("./database");

const recipeRouter = require('./routes/recipeRoutes');
app.use('/', recipeRouter);

const handleImageUpload = (file) => {
    if (!file) return null;
    
    const { originalname, path } = file;
    const extension = originalname.split(".").pop();
    const newPath = `${path}.${extension}`;
    fs.renameSync(path, newPath);
    return newPath;
};



app.post('/register', async (req, res) => {
    const {email, username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
        `INSERT INTO Users (username, password, email) VALUES (?, ?, ?)`,
        [username, hashedPassword, email])
    res.json(result)
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM Users WHERE username = ?";
    const results = await db.query(query, [username])
    const user = results[0];
  
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ error: "Invalid username or password" });
        return;
      }
  
      jwt.sign({ username, id: user.id }, process.env.SECRET_KEY, {}, (err, token) => {
        if (err) {
          console.error("Error generating token:", err);
          res.status(500).json({ error: "Error generating token" });
          return;
        }
        res.cookie("token", token).json({
          id: user.id,
          username,
        });
      });
  
})

app.post('/logout', async (req, res) => {
    res.cookie("token", "").json("ok");
})

app.get('/profile', async (req, res) => {
    const token = req.cookies.token;
    jwt.verify(token, process.env.SECRET_KEY, (err, info) => {
      if (err) {
        console.error("Error verifying token:", err);
        res.status(401).json({ error: "Unauthorized" });
        return;``
      }
      res.json(info);
    });
})

  
  

app.listen(4000, () => {
    console.log('Server running on port 4000');
})