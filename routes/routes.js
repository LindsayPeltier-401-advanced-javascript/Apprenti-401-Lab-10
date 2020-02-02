'use strict';

const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const categories = require('../lib/models/categories-model');
const products = require('../lib/models/products-model');
/**
 * sets model to inputted route or returns invalid model otherwise
 * @function getModel
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns model
 */
function getModel(request, response, next) {
  let model = request.params.model;
  switch (model) {
    case 'categories':
      request.model = categories;
      next();
      return;
    case 'products':
      request.model = products;
      next();
      return;
    default:
      next('invalid model');
  }
}

router.param('model', getModel);

router.get('/api/v1/:model', handleGetAll);
router.post('/api/v1/:model', handlePost);
router.get('/api/v1/:model/:id', handleGetOne);
router.put('/api/v1/:model/:id', handlePut);
router.delete('/api/v1/:model/:id', handleDelete);
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
/**
 * get all documents in this route
 * @function handleGetAll
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
function handleGetAll(request, response, next) {
  request.model.get()
    .then(records => {
      const output = {
        count: records.length,
        results: records,
      };
      response.status(200).json(output);
    })
    .catch(next);
}
/**
 * record to get one record
 * @function handleGetOne
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
function handleGetOne(request, response, next) {
  let id = request.params.id;
  request.model.get(id)
    .then(result => response.status(200).json(result))
    .catch(next);
}
/**
 * route to create record
 * @function handlePost
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
function handlePost(request, response, next) {
  request.model.post(request.body)
    .then(result => response.status(200).json(result))
    .catch(next);
}
/**
 * route to update record
 * @function handlePut
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
function handlePut(request, response, next) {
  let id = request.params.id;
  request.model.put(id, request.body)
    .then(result => response.status(200).json(result))
    .catch(next);
}
/**
 * route to delete record
 * @function handleDelete
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
function handleDelete(request, response, next) {
  let id = request.params.id;
  request.model.delete(id)
    .then(result => response.status(200).json(result))
    .catch(next);
}
/**
 * @module router
 */
module.exports = router;