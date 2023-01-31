const express = require("express");
const router = express.Router();
const coursesController = require("../app/controllers/coursesController");

router.get('/create', coursesController.create);
router.post('/store', coursesController.store);
router.post('/handle-form-actions', coursesController.handleFormActions);
router.get("/:id/edit", coursesController.edit)
router.get("/:slug", coursesController.show);
router.put("/:id", coursesController.update);
router.delete("/:id", coursesController.softDestroy);
router.delete("/:id/force", coursesController.forceDestroy);
router.patch("/:id/restore", coursesController.restore);
router.get("/", coursesController.home);

module.exports = router;
