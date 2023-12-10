// const express = require('express');
// const { login } = require('../controller/authController');
// const { verifyToken } = require('../middleware/authMiddleware');

// const router = express.Router();

// router.post('/login', login);

// router.get('/protected', verifyToken, (req, res) => {
//   res.json({ message: 'You have access to this protected route', user: req.user });
// });

// module.exports = router;