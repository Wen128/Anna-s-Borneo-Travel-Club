const express = require('express');
const router = express.Router();

// Assume `db` is already connected in your main app and is imported here
const db = require('../db'); // Adjust the path to your DB connection file

// Route to get all reservation
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Reservation';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database query failed.');
    } else {
      res.json(results);
    }
  });
});


// Route to add an reservation
router.post('/', (req, res) => {
    const { MemberID, AttractionID, EmployeeID, Date, Time, NumberOfVisitors, TotalCost } = req.body;
    const query = 'INSERT INTO Reservation (MemberID, AttractionID, EmployeeID, Date, Time, NumberOfVisitors, TotalCost) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [MemberID, AttractionID, EmployeeID, Date, Time, NumberOfVisitors, TotalCost], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to add reservation.');
      } else {
        res.status(201).send('reservation added successfully!');
      }
    });
  });

  
// Route to update a attraction
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { MemberID, AttractionID, EmployeeID, Date, Time, NumberOfVisitors, TotalCost } = req.body;
  
    const query = `
      UPDATE Reservation 
      SET MemberID = ?, AttractionID = ?, EmployeeID = ?, Date = ?, Time = ?, NumberOfVisitors = ?, TotalCost = ?
      WHERE ReservationID = ?
    `;
  
    db.query(
      query,
      [ MemberID, AttractionID, EmployeeID, Date, Time, NumberOfVisitors, TotalCost, id],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Failed to update reservation.');
        } else if (results.affectedRows === 0) {
          res.status(404).send('reservation not found.');
        } else {
          res.status(200).send('reservation updated successfully!');
        }
      }
    );
  });


  
// Route to delete a reservation
router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM Reservation WHERE ReservationID = ?';
  
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to delete reservation.');
      } else if (results.affectedRows === 0) {
        res.status(404).send('reservation not found.');
      } else {
        res.status(200).send('reservation deleted successfully!');
      }
    });
  });
  

module.exports = router;