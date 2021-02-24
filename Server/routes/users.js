const express = require('express');
const router = express.Router();

const user_controller = require('../controller/user');

//Resource paths for users
router.post('/', user_controller.create);
router.get('/:username', user_controller.getOne);
router.put('/:username', user_controller.updateOne);
router.delete('/:username', user_controller.deleteOne);

module.exports = router;
