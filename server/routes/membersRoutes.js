const express = require('express');
const router = express.Router();

// Assume `db` is already connected in your main app and is imported here
const db = require('../db'); // Adjust the path to your DB connection file

// Route to get all users
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Member';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database query failed.');
    } else {
      res.json(results);
    }
  });
});

// Route to add a user
router.post('/', (req, res) => {
  const { Name, ContactDetails, Address, MembershipType, ExpirationDate, FavouriteCity } = req.body;
  const query = 'INSERT INTO Member (Name, ContactDetails, Address, MembershipType, ExpirationDate, FavouriteCity) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [Name, ContactDetails, Address, MembershipType, ExpirationDate, FavouriteCity], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to add user.');
    } else {
      res.status(201).send('User added successfully!');
    }
  });
});

// Route to update a user
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Name, ContactDetails, Address, MembershipType, ExpirationDate, FavouriteCity } = req.body;

  const query = `
    UPDATE Member 
    SET Name = ?, ContactDetails = ?, Address = ?, MembershipType = ?, expirationDate = ?, FavouriteCity = ?
    WHERE MemberID = ?
  `;

  db.query(
    query,
    [Name, ContactDetails, Address, MembershipType, ExpirationDate, FavouriteCity, id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to update member.');
      } else if (results.affectedRows === 0) {
        res.status(404).send('Member not found.');
      } else {
        res.status(200).send('Member updated successfully!');
      }
    }
  );
});

// Route to delete a user
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Member WHERE memberID = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to delete member.');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Member not found.');
    } else {
      res.status(200).send('Member deleted successfully!');
    }
  });
});

module.exports = router;
