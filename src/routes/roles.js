const express = require('express');
const RoleController = require('../controller/roles.js');
const router = express.Router();

router.get('/', RoleController.getAllRoles);
router.post('/', RoleController.createNewRole);

module.exports = router;