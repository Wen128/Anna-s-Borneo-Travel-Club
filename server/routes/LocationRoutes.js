const express = require('express');
const router = express.Router();

// Assume `db` is already connected in your main app and is imported here
const db = require('../db'); // Adjust the path to your DB connection file

// Route to get all locations
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Location';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database query failed.');
    } else {
      res.json(results);
    }
  });
});


// Route to add an location
router.post('/', (req, res) => {
    const { City, State, Country } = req.body;
    const query = 'INSERT INTO Location (City, State, Country) VALUES (?, ?, ?)';
    db.query(query, [City, State, Country], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to add location.');
      } else {
        res.status(201).send('location added successfully!');
      }
    });
  });

  
// Route to update a employee
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { City, State, Country } = req.body;
  
    const query = `
      UPDATE Location 
      SET City = ?, State = ?, Country = ?
      WHERE LocationID = ?
    `;
  
    db.query(
      query,
      [City, State, Country, id],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Failed to update location.');
        } else if (results.affectedRows === 0) {
          res.status(404).send('location not found.');
        } else {
          res.status(200).send('location updated successfully!');
        }
      }
    );
  });


  
// Route to delete a location
router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM Location WHERE LocationID = ?';
  
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to delete location.');
      } else if (results.affectedRows === 0) {
        res.status(404).send('location not found.');
      } else {
        res.status(200).send('location deleted successfully!');
      }
    });
  });
  

module.exports = router