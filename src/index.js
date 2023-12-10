require('dotenv').config();
const PORT = process.env.PORT || 5000;
const mysql = require('mysql2');
const cors = require('cors');
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
        const { full_name, password, email } = req.body;

        if (!full_name || !password || !email) {
            return res.status(400).send({ message: 'Invalid request. Missing required fields.' });
        }

        const SQL = 'INSERT INTO users (full_name, password, email) SELECT ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT * FROM users WHERE email = ?)';
        const values = [full_name, password, email, email];

        const [result] = await db.query(SQL, values);

        if (result.affectedRows === 0) {
            // Jika tidak ada baris yang terpengaruh, artinya email sudah ada
            return res.status(409).send({ message: 'Email already exists' });
        }

        console.log('User inserted successfully');
        return res.status(200).send({ message: 'User added' });
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
  
      const SQL = 'SELECT * FROM users WHERE email = ? AND password = ?';
      const values = [email, password];
  
      // Ganti 'execute' atau 'query' sesuai dengan metode yang Anda gunakan
      const [results] = await db.execute(SQL, values);
  
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials', details: 'Email or password is incorrect.' });

      }
  
      const user = results[0];
      // Sesuaikan respons berdasarkan kebutuhan Anda
      return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });
  
  

app.use(middlewareLogRequest);

app.use(express.json());

app.use('/roles', rolesRoutes);

app.listen(PORT, () => {
    console.log(`Server running di port ${PORT}`);
});
