// const jwt = require('jsonwebtoken');
// const db = require('../config/database');

// const jwtMiddleware = async (req, res, next) => {
//     const token = req.header('Authorization');

//     if (!token) {
//         return res.status(401).json({ message: 'Token JWT tidak ditemukan' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const { email } = decoded;

//         const SQL = 'SELECT * FROM users WHERE email = ?';
//         const [results] = await db.execute(SQL, [email]);

//         if (results.length === 0) {
//         return res.status(401).json({ message: 'Token JWT tidak valid' });
//         }

//         req.user = { email }; // Menambahkan informasi pengguna ke objek req
//         next();
//     } catch (error) {
//         console.error(error);
//         return res.status(401).json({ message: 'Token JWT tidak valid' });
//     }
// };

// module.exports = jwtMiddleware;

// Generate JWT token
// const token = jwt.sign({ email, role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: '12h' });