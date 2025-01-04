const express = require('express');
const router = express.Router();

// Assume `db` is already connected in your main app and is imported here
const db = require('../db'); // Adjust the path to your DB connection file

// Route to get all attraction
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Attraction';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database query failed.');
    } else {
      res.json(results);
    }
  });
});


// Route to add an attraction
router.post('/', (req, res) => {
    const { Name, LocationID, Description, EntryFees } = req.body;
    const query = 'INSERT INTO Attraction (Name, LocationID,  Description, EntryFees) VALUES (?, ?, ?, ?)';
    db.query(query, [Name, LocationID, Description, EntryFees], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to add attraction.');
      } else {
        res.status(201).send('attraction added successfully!');
      }
    });
  });

  
// Route to update a attraction
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { Name, LocationID, Description, EntryFees } = req.body;
  
    const query = `
      UPDATE Attraction 
      SET Name = ?, LocationID = ?, Description = ?, EntryFees = ?
      WHERE AttractionID = ?
    `;
  
    db.query(
      query,
      [ Name, LocationID, Description, EntryFees, id],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Failed to update attraction.');
        } else if (results.affectedRows === 0) {
          res.status(404).send('attraction not found.');
        } else {
          res.status(200).send('attraction updated successfully!');
        }
      }
    );
  });


  
// Route to delete a attraction
router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM Attraction WHERE AttractionID = ?';
  
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to delete attraction.');
      } else if (results.affectedRows === 0) {
        res.status(404).send('attraction not found.');
      } else {
        res.status(200).send('attraction deleted successfully!');
      }
    });
  });
  

module.exports = router;