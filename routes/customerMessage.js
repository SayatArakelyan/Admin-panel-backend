const express = require('express');
const router = express.Router();
const controller = require('../controllers/custumerMessageController');
const {authenticateToken} = require("../middlewares/authenticateToken");


router.get('/:userId' , controller.getMessageList);



router.post('/', authenticateToken, controller.createCustomerMessage)
router.put("/:id" ,authenticateToken, controller.updateCustomerMessage)
router.delete('/:userId/:id', controller.deleteCustomerMessage);
// router.post("/changeValue" ,controller.changeDefaultIsReadValue)


module.exports = router;