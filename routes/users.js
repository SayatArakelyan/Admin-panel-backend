const express = require('express');
const router = express.Router();
const controller = require('../controllers/userControllers');


router.get('/', controller.getUsersList);
router.get('/:id', controller.getOneUser);



module.exports = router;