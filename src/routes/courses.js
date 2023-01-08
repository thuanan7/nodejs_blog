const express = require("express");
const router = express.Router();
const coursesController = require("../app/controllers/coursesController");
const errorController = require("../app/controllers/ErrorController");

router.get("/:slug", coursesController.show);
router.get("/", coursesController.home);
router.use(errorController.err404);
router.use(errorController.err500);

module.exports = router;
