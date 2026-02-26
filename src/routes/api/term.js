const express = require("express");
const routerAPI = express.Router();

const { postCreateTerm, getAllTerms, putUpdateTerm, deleteTerm } = require('../../controllers/api/termApiController');

routerAPI.post('/', postCreateTerm);
routerAPI.get('/', getAllTerms);
routerAPI.put('/:id', putUpdateTerm);
routerAPI.delete('/:id', deleteTerm);


module.exports = routerAPI;