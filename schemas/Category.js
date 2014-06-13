// Schema for Departments;
exports.schema = {
  name: String
};

// Require autoREST-library
var autoREST = require("../libs/autoREST");

// API routes for Department
var routes = exports.routes = autoREST.buildRoutes(
  "Category", "categories:ALL"
);
