const express = require("express");
const routerAPI = express.Router();


const { postCreateUser, postCreateArrayUser, getAllUsers, putUpdateUser, deleteUser, deleteArrayUser, getDetailUser } = require('../../controllers/api/userApiController');

// API User
routerAPI.post('/', postCreateUser);
// routerAPI.post('/Users-many', postCreateArrayUser);
routerAPI.get('/', getAllUsers);
// detail user
routerAPI.get('/:id', getDetailUser);
routerAPI.put('/:id', putUpdateUser);
routerAPI.delete('/:id', deleteUser);
// routerAPI.delete('/Users-many', deleteArrayUser);


module.exports = routerAPI;