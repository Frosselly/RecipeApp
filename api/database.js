const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database");
  }
});

const query = (query, args = []) => {
  return new Promise((resolve, reject) => {
    db.query(query, args, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

exports.query = query;