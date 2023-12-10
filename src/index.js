require('dotenv').config()
const PORT = process.env.PORT || 5000;
const mysql = require('mysql2');
const cors = require('cors')
const express = require('express');
const rolesRoutes = require('./routes/roles.js')
const app = express();
const middlewareLogRequest = require('./middleware/logs');
const db = require ('./config/database.js')

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// REGISTER LOGIN
app.use(cors())

app.post('/register', (req, res) => {
    console.log(req.body);
    const sentName = req.body.name;
    const sentPassword = req.body.password;
    const sentEmail = req.body.email;

    if (!sentName || !sentPassword || !sentEmail) {
        return res.status(400).send({ message: 'Invalid request. Missing required fields.' });
    }

    const SQL = 'INSERT INTO users (full_name, password, email) SELECT ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT * FROM users WHERE email = ?)';
    const Values = [sentName, sentPassword, sentEmail, sentEmail];
    db.query(SQL, Values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
        } else {
            if (result.affectedRows === 0) {
                // Jika tidak ada baris yang terpengaruh, artinya email sudah ada
                res.status(409).send({ message: 'Email already exists' });
            } else {
                console.log('User inserted successfully');
                res.status(200).send({ message: 'User added' });
            }
        }
    });
});
















// REGISTER LOGIN

app.use(middlewareLogRequest);

app.use(express.json());

app.use('/roles', rolesRoutes)

app.listen(PORT, () => {
    console.log(`Server running di port ${PORT}`)
})