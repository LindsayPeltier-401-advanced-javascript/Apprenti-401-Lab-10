# Apprenti-401-Lab-10
Includes Labs 7, 8, and 9

## Final API Server

### Author: Lindsay Peltier

### Links and Resources
* [submission PR]()
* [travis]()
* [back-end]()
* [mongo-model npm]()

#### Documentation
* [api docs]()
* [jsdocs]()

### Setup
* npm init -y
* npm install

#### `.env` requirements
* `PORT` - Port Number
* `MONGODB_URI` - URL to the running mongo instance/db

#### How to initialize/run your server app (where applicable)
* Start App: `npm start`
* Endpoint: /api-docs
  * Returns api-documentation
* Endpoint: /docs
  * Returns JSdocs
* Endpoint: /api/v1/products
  * Returns all products
* Endpoint: /api/v1/products/:id
  * Returns specific products
* Endpoint: /api/v1/categories
  * Returns all categories
* Endpoint: /api/v1/categories/:id
  * Returns specific category
  
#### Tests
* Unit Tests: `npm test`
* Eslint: `npm run lint`

#### UML
![UML]()