const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;


const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Aris0007@',
  database: 'Expense_Tracker'
};


const pool = mysql.createPool(dbConfig);

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
  connection.release(); 
});


app.use(express.json());


app.get('/data', (req, res) => {
  pool.query('SELECT * FROM Expenses', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
