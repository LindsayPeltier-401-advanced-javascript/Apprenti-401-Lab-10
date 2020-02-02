'use strict';

const { server } = require('../lib/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('categories routes', () => {

  it('should get() categories', () => {
    const object = { name: 'test' };
    return mockRequest.post('/api/v1/categories')
      .send(object)
      .then(results => {
        return mockRequest.get('/api/v1/categories')
          .then(data => {
            Object.keys(object).forEach(key => {
              expect(data.body.results[0][key]).toEqual(object[key]);
            });
          });
      });
  });

  it('should get() a categories', () => {
    const object = { name: 'test' };
    return mockRequest.post('/api/v1/categories')
      .send(object)
      .then(results => {
        return mockRequest.get(`/api/v1/categories/${results.body._id}`)
          .then(data => {
            Object.keys(object).forEach(key => {
              expect(data.body[key]).toEqual(object[key]);
            });
          });
      });
  });

  it('should post a categories', () => {
    const object = { name: 'test' };
    return mockRequest.post('/api/v1/categories')
      .send(object)
      .then(results => {
        Object.keys(object).forEach(key => {
          expect(results.body[key]).toEqual(object[key]);
        });
      });
  });

  it('should update a categories', () => {
    const object = { name: 'test' };
    const updated = { name: 'newTest' };

    return mockRequest.post('/api/v1/categories')
      .send(object)
      .then(results => {
        return mockRequest.put(`/api/v1/categories/${results.body._id}`)
          .send(updated)
          .then(data => {
            Object.keys(updated).forEach(key => {
              expect(data.body[key]).toEqual(updated[key]);
            });
          });
      });
  });

  it('should delete a categories', () => {
    const object = { name: 'test' };
    return mockRequest.post('/api/v1/categories')
      .send(object)
      .then(results => {
        return mockRequest.delete(`/api/v1/categories/${results.body._id}`)
          .then(results => {
            return mockRequest.get(`/api/v1/categories/${results.body._id}`)
              .then(data => {
                expect(data.body).toBeNull;
              });
          });
      });
  });
});