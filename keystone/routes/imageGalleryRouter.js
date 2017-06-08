var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api') 
};

module.exports = function(app) {

  // Keystone Views
  //app.get('/test', routes.views.test);
  
  // Plugin API Route
  app.get('/api/imagegallery/list', keystone.middleware.api, routes.api.imagegallery.list);
  app.all('/api/imagegallery/create', keystone.middleware.api, routes.api.imagegallery.create);
  app.all('/api/imagegallery/:id/update', keystone.middleware.api, routes.api.imagegallery.update);
	app.get('/api/imagegallery/:id/remove', keystone.middleware.api, routes.api.imagegallery.remove);
  
  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
  //app.get('/loggedinuser', middleware.requireUser, routes.views.loggedinuser);
}