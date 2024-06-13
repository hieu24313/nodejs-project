const pool = require('../config/db');
const { getUsers } = require('../models/userModel');

const fetchUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
    // res.status(200).json({data: 'Xin chào'});
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Database error' });
  }
};


const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email,password]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  try {
    const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, userId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
};
module.exports = {
  fetchUsers,
  createUser,
  updateUser
};
