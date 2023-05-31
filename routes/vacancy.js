const express = require('express');
const router = express.Router();
const controller = require('../controllers/vacancyControllers');
const {upload}= require('../middlewares/multer');
const {authenticateToken} = require("../middlewares/authenticateToken");

router.get('/', controller.getVacancyList);
router.get("/category",controller.getJobCategoryList)
router.get("/specialistLevel",controller.getSpecialistLevelList)


router.use(authenticateToken);
router.post('/', upload.single('image'),controller.createVacancy);
router.put('/:id', controller.updateVacancy);
router.delete('/:id', controller.deleteVacancy);
router.post('/createCategory',controller.createJobCategory)
router.post('/createSpecialistLevel',controller.createSpecialistLevel)

module.exports = router;
