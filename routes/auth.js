
const express = require('express');
const router = express.Router();
const controller = require('../controllers/authControllers');
const {upload,setDefaultImage} = require('../middlewares/multer');



router.post('/register', upload.single("image"), setDefaultImage, controller.register,controller.sendVerificationEmail);
router.post('/login', controller.login);
router.put('/changeUserRole', controller.changeUserRole);
router.get("/verify",controller.generateVerificationToken)

module.exports = router;
