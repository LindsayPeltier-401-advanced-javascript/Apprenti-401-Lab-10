'use strict';

const { server } = require('../lib/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('product routes', () => {

  it('should get() products', () => {
    const object = { name: 'test', quantity: 10, category: 'test' };
    return mockRequest.post('/api/v1/products')
      .send(object)
      .then(results => {
        return mockRequest.get('/api/v1/products')
          .then(data => {
            Object.keys(object).forEach(key => {
              expect(data.body.results[0][key]).toEqual(object[key]);
            });
          });
      });
  });

  it('should get() a product', () => {
    const object = { name: 'test', quantity: 10, category: 'test' };
    return mockRequest.post('/api/v1/products')
      .send(object)
      .then(results => {
        return mockRequest.get(`/api/v1/products/${results.body._id}`)
          .then(data => {
            Object.keys(object).forEach(key => {
              expect(data.body[key]).toEqual(object[key]);
            });
          });
      });
  });

  it('should post a product', () => {
    const object = { name: 'test', quantity: 10, category: 'test' };
    return mockRequest.post('/api/v1/products')
      .send(object)
      .then(results => {
        Object.keys(object).forEach(key => {
          expect(results.body[key]).toEqual(object[key]);
        });
      });
  });

  it('should update a product', () => {
    const object = { name: 'test', quantity: 10, category: 'test' };
    let updated = { name: 'newTest', quantity: 1 };

    return mockRequest.post('/api/v1/products')
      .send(object)
      .then(results => {
        return mockRequest.put(`/api/v1/products/${results.body._id}`)
          .send(updated)
          .then(data => {
            Object.keys(updated).forEach(key => {
              expect(data.body[key]).toEqual(updated[key]);
            });
          });
      });
  });

  it('should delete a product', () => {
    const object = { name: 'test', quantity: 10, category: 'test' };
    return mockRequest.post('/api/v1/products')
      .send(object)
      .then(results => {
        return mockRequest.delete(`/api/v1/products/${results.body.id}`)
          .then(data => {
            Object.keys(object).forEach(key => {
              expect(data.body[key]).not.toEqual(object[key]);
            });
          });
      });
  });
});