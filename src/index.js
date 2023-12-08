require('dotenv').config()
const PORT = process.env.PORT || 5000;

const express = require('express');
const usersRoutes = require('./routes/users.js');
const rolesRoutes = require('./routes/roles.js')
const app = express();
const middlewareLogRequest = require('./middleware/logs');

app.use(middlewareLogRequest);

app.use(express.json());

app.use('/users', (usersRoutes))
app.use('/roles', (rolesRoutes))

app.listen(PORT, () => {
    console.log(`Server running di port ${PORT}`)
})