const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");
const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.buildById = async function (req, res, next) {
  // get inventory id from params
  const inventory_id = req.params.inv_id;

  // get specific vehicle data
  const vehicleDetails = await invModel.getInventoryItemById(inventory_id);

  // in case vehicle isn't found
  if (!vehicleDetails) {
    return res.status(404).send("Vehicle not found");
  }

  const nav = await utilities.getNav();
  const detailView = await utilities.buildDetailView(vehicleDetails);

  // render detail view
  res.render("./inventory/detail", {
    title: vehicleDetails.inv_make + " " + vehicleDetails.inv_model,
    nav,
    detailView,
  });
};

/* ***************************
 *  Build inv management view
 * ************************** */
invCont.buildManageInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("./inventory/management", {
    title: "Manage Inventory",
    nav,
  });
};

/* ***************************
 *  Build add classification view
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
  });
};

/* ***************************
 *  Add new classification
 * ************************** */
invCont.addClassification = async function (req, res) {
  let nav = await utilities.getNav();
  const { classification_name } = req.body;

  const addClassificationResult = await invModel.addClassification(
    classification_name
  );

  if (addClassificationResult) {
    req.flash(
      "notice",
      `New Classification ${classification_name} added successfully.`
    );
    res.status(201).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
    });
  } else {
    req.flash(
      "error",
      `Sorry, there was an error adding the ${classification_name} as a new class.`
    );
    res.status(501).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
    });
  }
};

/* ***************************
 *  Build add inventory view
 * ************************** */

/* ***************************
 *  Build error view
 * ************************** */
invCont.buildError = async function (req, res, next) {
  const error = new Error("Server Error");
  error.status = 500;
  throw error;
};

module.exports = invCont;
