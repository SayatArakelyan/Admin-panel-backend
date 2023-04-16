
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productControllers');
const upload = require('../middlewares/multer');
const {authenticateToken} = require("../middlewares/authenticateToken");

router.get('/', controller.getProductsList);
router.get('/:id', controller.getOneProduct);

router.use(authenticateToken);
router.post('/', upload.single('image'),controller.createProduct);
router.put('/:id', controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;
