// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities");

// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  utilities.handleError(invController.buildByClassificationId)
);

// Route for detail view
router.get("/detail/:inv_id", utilities.handleError(invController.buildById));

// Route to build error
/* router.get("/", utilities.handleError(invController.buildError)); */

router.get("/", async (req, res, next) => {
  await utilities.handleError(invController.buildError)(req, res, next);
});

module.exports = router;
