const express = require('express');
const router = express.Router();
const controller = require('../controllers/messagrControllers');
const {upload} = require('../middlewares/multer');
const {authenticateToken} = require("../middlewares/authenticateToken");


router.get("/",controller.getAllMessages)
router.post('/', upload.single('image'), controller.sendMessage);

router.use(authenticateToken);
router.delete('/:id', controller.removeMessage);


module.exports = router;