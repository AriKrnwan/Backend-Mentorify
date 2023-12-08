const getAllUsers = (req, res) => {
    const data = {
        id: '1',
        name: "Ari",
        email: "ari@gmail.com"
    }
    res.json({
        message: 'GET all Uusers success',
        data: data
    })
}

const createNewUser = (req, res) => {
    console.log(req.body);
    res.json({
        message: 'Create new user success',
        data: req.body
    })
}

const updateUser = (req, res) => {
    const {id} = req.params;
    console.log('id', id);
    res.json ({
        message: 'update user success',
        data: req.body
    })
}

const deleteUser = (req, res) => {
    const {id} = req.params;
    res.json({
        message: 'DELETE user success',
        data: {
            id: id,
            name: 'Ari Kurniawan',
            email: '@gmail.com'
        }
    })
}

module.exports = {
    getAllUsers, 
    createNewUser,
    updateUser,
    deleteUser
}