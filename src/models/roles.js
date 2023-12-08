const dbPool = require('../config/database');

const getAllRoles = () => {
    const SQLQuery = 'SELECT * FROM roles';

    return dbPool.execute(SQLQuery);
}

const createNewRole = (body) => {
    const SQLQuery = `INSERT INTO roles (name) VALUES ('${body.name}')`

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllRoles,
    createNewRole
}