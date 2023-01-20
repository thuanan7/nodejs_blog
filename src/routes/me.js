const express = require("express");
const router = express.Router();
const meController = require("../app/controllers/MeController");

router.get('/stored/courses', meController.storedCourses);
router.get('/trashes/courses', meController.trashesCourses);
router.get('/stored', meController.stored);

module.exports = router;
