// Schema for Employee;
exports.schema = {
  title: String,
  smallbody: String,
  body: String,
  categoryId: String,
  data: String,
};

// Require autoREST-library
var autoREST = require("../libs/autoREST");

// API routes for Employee
var routes = exports.routes = autoREST.buildRoutes(
  "Article", "articles:ALL"
);

// List of employeers - modify with a join on department
autoREST.modify(routes["GET:articles"],{
  populate: {
    join: "Category",
    joinOn: ["categoryId", "_id"],
    filter: "name",
    toProperty: "category"
  }
});

// One employee - modify with join on department
// (reusing the join from our previous route)
autoREST.modify(routes["GET:articles/:id"],{
  populate: routes["GET:articles"].populate
});

// Return a list of employees in a certain department
autoREST.add(routes,"GET:articles/category/:id",{
  query: function(req){ return {categoryId: req.params.id}; }
});