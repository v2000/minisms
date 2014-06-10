app.factory("Employee", function($resource, $http) {
  var resource = $resource("/api/employees/:id", { id: "@_id" },
    {
      'create':  { method: 'POST' },
      'index':   { method: 'GET', isArray: true },
      'show':    { method: 'GET', isArray: false },
      'update':  { method: 'PUT' },
      'destroy': { method: 'DELETE' }
    }
  );

  return resource;
});

app.factory("Article", function($resource, $http) {
  var resource = $resource("/api/articles/:id", { id: "@_id" },
    {
      'create':  { method: 'POST' },
      'index':   { method: 'GET', isArray: true },
      'show':    { method: 'GET', isArray: false },
      'update':  { method: 'PUT' },
      'destroy': { method: 'DELETE' }
    }
  );

  return resource;
});

app.factory("EmployeeDepartment", function($resource, $http) {
  var resource = $resource("/api/employees/department/:id", { id: "@_id" },
    {
      'index':   { method: 'GET', isArray: true },
    }
  );

  return resource;
});

app.factory("ArticleCategory", function($resource, $http) {
  var resource = $resource("/api/articles/category/:id", { id: "@_id" },
    {
      'index':   { method: 'GET', isArray: true },
    }
  );

  return resource;
});

app.factory("Department", function($resource, $http) {
  var resource = $resource("/api/departments/:id", { id: "@_id" },
    {
      'create':  { method: 'POST' },
      'index':   { method: 'GET', isArray: true },
      'show':    { method: 'GET', isArray: false },
      'update':  { method: 'PUT' },
      'destroy': { method: 'DELETE' }
    }
  );

  return resource;
});

app.factory("Category", function($resource, $http) {
  var resource = $resource("/api/categories/:id", { id: "@_id" },
    {
      'create':  { method: 'POST' },
      'index':   { method: 'GET', isArray: true },
      'show':    { method: 'GET', isArray: false },
      'update':  { method: 'PUT' },
      'destroy': { method: 'DELETE' }
    }
  );

  return resource;
});