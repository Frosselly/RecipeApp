const mysql = require("mysql2");

const db = mysql.createConnection({
  host: `0.0.0.0`,
  port: 3306,
  user: "root",
  password: "pass123",
  database: "RecipeApp",
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