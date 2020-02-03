'use strict';
/** 
 * error handler module
 * @module errorHandler
*/
module.exports = (err, request, response, next) => {
  let error = { error: 'Resource Not Found' };
  response.statusCode = 500;
  response.statusMessage = 'Not Found';
  response.setHeader('Content-Type', 'application/json');
  response.write(JSON.stringify(error));
  response.end();
};