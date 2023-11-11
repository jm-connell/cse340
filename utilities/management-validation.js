const utilities = require(".");
const { body, validationResult } = require("express-validator");
const validate = {};
const invModel = require("../models/inventory-model");

/*  **********************************
 *  Add Classification Validation Rules
 * ********************************* */
validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a classification name."),

    body("classification_name")
      .trim()
      .isAlpha()
      .withMessage(
        "Classification name must contain only alphabetic characters."
      ),
  ];
};

/* ******************************
 * Check classification name data and continue to db if valid
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
  const errors = validationResult(req);
  const { classification_name } = req.body;

  // if there are errors, send back with error messages
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    return res.render("./inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors,
      classification_name,
    });
  }

  // if no errors, continue to db
  next();
};

module.exports = validate;
