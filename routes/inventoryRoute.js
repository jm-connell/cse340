// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route for detail view
router.get("/detail/:inv_id", invController.buildById);

// Route to build error ? needs to be wrapped in task 2
//router.get("/error", invController.buildError); // path?, buildError doesn't exist yet

module.exports = router;

// error handling in this file
