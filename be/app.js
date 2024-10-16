const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true, // Allow credentials (cookies)
}));

// Session middleware setup
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Your existing routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
