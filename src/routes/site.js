const express = require("express");
const router = express.Router();
const siteController = require("../app/controllers/SiteController");
const errorController = require("../app/controllers/ErrorController");

router.get("/", siteController.home);
router.get("/search", siteController.search);

// router.use(errorController.err404);

// router.use(errorController.err500);

module.exports = router;
