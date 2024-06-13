const express = require('express');
const { fetchUsers, createUser, updateUser } = require('../controllers/userController');
const { generateToken } = require('../utils/jwt');
const { getUsersLogin } = require('../models/userModel');

const router = express.Router();

router.get('/users', fetchUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.post('/login', async (req, res) => {
    // Xác thực người dùng ở đây
    const { email, password } = req.body

    const rs = await getUsersLogin(email, password)
    // console.log(rs.length)
    if (rs.length == 0)
        res.status(401).json({error: "Email or password incorrect!"})
    const user = { email: email, password: password }; // Giả sử người dùng đã được xác thực
    console.log(rs[0])
    // Tạo và gửi token về cho người dùng
    const token = generateToken(user);
    res.json({ name: rs[0]['name'], token: token });
  });

module.exports = router;
