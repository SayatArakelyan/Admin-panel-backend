const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryControllers');
const {authenticateToken} = require("../middlewares/authenticateToken");

router.get('/', controller.getCategoryList);
router.get('/:id', controller.getOneCategory);

router.use(authenticateToken);
router.post('/', controller.createCategory);
router.put('/:id', controller.updateCategory);
router.delete('/:id', controller.deleteCategory);

module.exports = router;