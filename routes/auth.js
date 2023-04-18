
const express = require('express');
const router = express.Router();
const controller = require('../controllers/authControllers');
const {upload,setDefaultImage} = require('../middlewares/multer');


router.post('/register', upload.single("image"), setDefaultImage, controller.register);
router.post('/login', controller.login);
router.put('/changeUserRole', controller.changeUserRole);

module.exports = router;
