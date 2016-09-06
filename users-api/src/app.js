if (process.env.NODE_ENV !== 'production') {
  require('babel-register');
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const logger = require('winston');
const SwaggerExpress = require('swagger-express-mw');
const SwaggerUi = require('swagger-tools/middleware/swagger-ui');
const app = express();
// Add middleware
app.use(cors());
app.use(morgan('dev'));

/*

 app.get('/', function(req, res, err) { // eslint-disable-line no-unused-vars
 var md = function(filename) {
 var path = __dirname + "/" + filename;
 var include = fs.readFileSync(path, 'utf8');
 var html = marked(include);

 return html;
 };

 return res.render('index.ejs', {
 "md": md
 });
 });

 // See the User Controller for `/users` routes
 app.use('/users', userController);

*/

var config = {
  appRoot: __dirname, // required config
  swaggerFile: `${__dirname}/config/swagger.yaml`,
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);
  app.use(SwaggerUi(swaggerExpress.runner.swagger));


  if (swaggerExpress.runner.swagger.paths['/hello']) {
    logger.info('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});

// Some switches for acceptance tests
if (require.main === module) {
  // Only connect to MongoDB if app.js is run
  // If require'd (e.g. in tests), let these tests establish a DB connection themselves
  mongoose.connect('mongodb://localhost/users');

  var port = process.env.PORT || 8000;
  app.listen(port);
  // Only listen when app.js is run - acceptance tests will listen on another port
}

module.exports = app;
