const User = require('../models/User'); // Import the User model
const argon2 = require('argon2'); // Import the argon2 library

// Register user
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await argon2.hash(password);

        // Create a new user
        const newUser = await User.create({ username, password: hashedPassword });

        res.status(201).json({ msg: 'User registered successfully', newUser });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err });
    }
};

// Login user
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        // Verify the password
        const validPassword = await argon2.verify(user.password, password);
        if (!validPassword) {
            return res.status(400).json({ msg: 'Invalid password' });
        }

        res.status(200).json({ msg: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err });
    }
};

exports.logout = (req, res) => {
    // Destroy the session and clear the cookie
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.clearCookie('connect.sid'); // Clear the session cookie
      return res.status(200).json({ message: 'Logged out successfully' });
    });
  };
  