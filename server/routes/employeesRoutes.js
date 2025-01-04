const express = require('express');
const router = express.Router();

// Assume `db` is already connected in your main app and is imported here
const db = require('../db'); // Adjust the path to your DB connection file

// Route to get all employees
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Employee';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database query failed.');
    } else {
      res.json(results);
    }
  });
});


// Route to add an employee
router.post('/', (req, res) => {
    const { Name, ContactInformation, Location, PerformanceCount, CurrentReservation } = req.body;
    const query = 'INSERT INTO Employee (Name, ContactInformation, Location, PerformanceCount, CurrentReservation) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [Name, ContactInformation, Location, PerformanceCount, CurrentReservation], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to add employee.');
      } else {
        res.status(201).send('Employee added successfully!');
      }
    });
  });

  
// Route to update a employee
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { Name, ContactInformation, Location, PerformanceCount, CurrentReservation } = req.body;
  
    const query = `
      UPDATE Employee 
      SET Name = ?, ContactInformation = ?, Location = ?, PerformanceCount = ?, CurrentReservation = ?
      WHERE EmployeeID = ?
    `;
  
    db.query(
      query,
      [Name, ContactInformation, Location, PerformanceCount, CurrentReservation, id],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Failed to update employee.');
        } else if (results.affectedRows === 0) {
          res.status(404).send('employee not found.');
        } else {
          res.status(200).send('employee updated successfully!');
        }
      }
    );
  });


  
// Route to delete a employee
router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM Employee WHERE EmployeeID = ?';
  
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to delete employee.');
      } else if (results.affectedRows === 0) {
        res.status(404).send('employee not found.');
      } else {
        res.status(200).send('employee deleted successfully!');
      }
    });
  });
  

module.exports = router