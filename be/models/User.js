const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync()
    .then(() => {
        console.log('User model synced successfully...');
    })
    .catch((err) => {
        console.log('Sync error:', err);
    });

module.exports = User;
