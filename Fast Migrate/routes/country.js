const express = require('express');
const router = express.Router();

const country_controller = require('../controller/country');

//Resource paths for country
router.post('/', country_controller.create);
router.get('/', country_controller.all);
router.get('/:name', country_controller.getOne);
router.put('/:name', country_controller.updateOne);
router.delete('/:name', country_controller.deleteOne);

module.exports = router;
