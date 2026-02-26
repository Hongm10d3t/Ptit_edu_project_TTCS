const express = require("express");
const routerAPI = express.Router();

const { postCreateSection, getAllSections, putUpdateTerm, deleteTerm } = require('../../controllers/api/sectionApiController');

routerAPI.post('/', postCreateSection);
routerAPI.get('/', getAllSections);
// routerAPI.put('/:id', putUpdateTerm);
// routerAPI.delete('/:id', deleteTerm);


module.exports = routerAPI;