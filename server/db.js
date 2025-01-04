const mysql = require('mysql2');


const db = mysql.createPool({
  host: 'sql12.freesqldatabase.com', // Replace with your MySQL host
  user: 'sql12755246',      // Replace with your MySQL username
  password: 'uiUP4Pc13d',      // Replace with your MySQL password
  database: 'sql12755246', // Replace with your database name
});

db.getConnection((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL!');
  }
});

module.exports = db;