const pool = require('../config/db');

const getUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

const getUsersLogin = async (email, pass) => {
  const result = await pool.query('SELECT * FROM users where email=$1 and password=$2', [email, pass]);
  return result.rows;
};

module.exports = {
  getUsers,
  getUsersLogin
};
