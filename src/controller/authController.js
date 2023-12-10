// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// const login = (req, res) => {
//     const { email, password } = req.body;

//     User.getByEmail(email, (err, user) => {
//         if (err) throw err;

//         if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//         }

//         bcrypt.compare(password, user.password, (err, isMatch) => {
//             if (err) throw err;

//             if (isMatch) {
//                 const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
//                 expiresIn: '1h',
//                 });
//                 res.json({ token });
//             } else {
//                 res.status(401).json({ message: 'Invalid password' });
//             }
//         });
//     });
// };

// module.exports = { login };