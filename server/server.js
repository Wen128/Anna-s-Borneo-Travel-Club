const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db'); // Import your DB connection
const membersRoutes = require('./routes/membersRoutes'); // Adjust the path if needed
const employeesRoutes = require('./routes/employeesRoutes');
const attractionRoutes = require('./routes/attractionRoutes');
const locationRoutes = require('./routes/LocationRoutes')
const reservationRoutes = require('./routes/reservationRoutes')

// Middleware
app.use(express.json());

app.use(cors());

// Test route
app.get('/', (req, res) => {
  res.send('Successful response.');
});

// Use members routes
app.use('/members', membersRoutes);

app.use('/employees', employeesRoutes)

app.use('/attractions', attractionRoutes);

app.use('/locations', locationRoutes);

app.use('/reservations', reservationRoutes);

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
