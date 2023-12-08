const RolesModel = require('../models/roles');

const getAllRoles = async (req, res) => {
    try {
        const [data] = await RolesModel.getAllRoles();

        res.json({
            message: 'GET all roles success',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMessage: error,
        })
    }
};

const createNewRole = async (req, res) => {
    const {body} = req;

    try {
        await RolesModel.createNewRole(body);
        res.json({
            message: 'Create new role success',
            data: body
        })
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMessage: error,
        })
    }
}

module.exports = {
    getAllRoles,
    createNewRole
}