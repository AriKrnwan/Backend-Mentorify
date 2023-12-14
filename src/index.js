require('dotenv').config();
const PORT = process.env.PORT || 5000;
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Add this line for JWT
const express = require('express');
const rolesRoutes = require('./routes/roles.js');
const app = express();
const middlewareLogRequest = require('./middleware/logs');
const db = require('./config/database.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// REGISTER
app.use(cors());

app.post('/register', async (req, res) => {
  try {
    const { full_name, password, email, institution, phone } = req.body;

    // Validasi minimal kolom yang diperlukan
    if (!full_name || !email || !password) {
      return res.status(400).send({ message: 'Invalid request. Email and password are required.' });
    }

    // Tambahkan nilai default untuk role_id atau atur nilai yang sesuai dengan skema Anda
    const role_id = 1;

    // Hash password menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Membangun array values sesuai dengan kolom yang akan diisi
    const values = [role_id, full_name, hashedPassword, email, institution, phone];
    const placeholders = ['role_id', 'full_name', 'password', 'email', 'institution', 'phone'];

    const placeholdersStr = placeholders.join(', ');
    const placeholdersValues = Array(placeholders.length).fill('?').join(', ');

    const SQL = `INSERT INTO users (${placeholdersStr}) 
                   SELECT ${placeholdersValues} FROM DUAL 
                   WHERE NOT EXISTS (SELECT * FROM users WHERE email = ?)`;

    const [result] = await db.query(SQL, [...values, email]);

    if (result.affectedRows === 0) {
      // Jika tidak ada baris yang terpengaruh, artinya email sudah ada
      return res.status(409).send({ message: 'Email already exists' });
    }

    console.log('User inserted successfully');

    // Generate JWT token
    const token = jwt.sign({ email, role_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).send({ message: 'User added', token });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
});

// LOGIN
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Invalid request. Missing required fields.' });
    }

    const SQL = 'SELECT * FROM users WHERE email = ?';
    const values = [email];

    const [results] = await db.execute(SQL, values);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials', details: 'Email or password is incorrect.' });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials', details: 'Email or password is incorrect.' });
    }

    // Generate JWT token
    const token = jwt.sign({ email, role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Jika password valid, Anda dapat melanjutkan dengan respons login yang berhasil
    return res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// middleware verifikasi token
// const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: 'Forbidden', error: err.message });
//         }

//         req.user = decoded;
//         next();
//     });
// };


app.use(middlewareLogRequest);
app.use(express.json());
app.use('/roles', rolesRoutes);

app.listen(PORT, () => {
  console.log(`Server running di port ${PORT}`);
});
