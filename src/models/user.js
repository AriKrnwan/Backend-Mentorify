
const dbPool = require('../config/database');

const User = {
  getByEmail: (email, callback) => {
    dbPool.query('SELECT * FROM users WHERE username = ?', [email], callback);
  },
};

module.exports = User;
