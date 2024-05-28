// server.js

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dbConnection = require('./db');
const { isAdmin } = require('./middleware/authMiddleware.js');

app.use(express.json());

// Import routes for cars, users, and bookings
const motorsRoute = require('./routes/motorsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');
const adminsRoute = require('./routes/adminsRoute');

// Use routes
app.use('/api/cars', motorsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);

// Use admin routes with isAdmin middleware protection
app.use('/api/admin', isAdmin, adminsRoute);

const path = require('path');

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    });
}

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`));
