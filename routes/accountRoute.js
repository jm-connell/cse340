// Needed Resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities");
const accountController = require("../controllers/accountController");

// Route when login button is clicked
router.get("/login", utilities.handleError(accountController.buildLogin));

// Handle registration post request
router.post(
  "/register",
  utilities.handleError(accountController.registerAccount)
);

// Registration route
router.get("/register", utilities.handleError(accountController.buildRegister));

module.exports = router;
