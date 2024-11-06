# Node.js - Express.js - MongoDb 

## Description

Creating a Node.js application can be easy and really fast but a little bit repetitive. There is a repository to use when you have to init a new application using a Node.js + Express.js + MongoDb application.

## Technologies

- Node.js
- Express.js
- MongoDb

## Structure

### /.github

This folder can be used to write your workflow, your pull_request template and also your issue template.

-> **/workflows**  
-> **pull_request_template.md**

### /src

This folder contain all the application logic.

```
└─── src
    ├── app.js
    ├── server.js
    ├── controllers
       └── controller.js
    ├── dev-data
       ├── models
          └── models.json
       └── import-dev-data.js   
    ├── middlewares
       └── middleware.js
    ├── models
       └── model.js
    ├── public
      └── views
         └── index.html
    ├── routes
       └── router.js
    ├── server.js
    ├── tests
       ├── controllers
          └── controller.test.js
       ├── middlewares
          └── middleware.test.js
       └── utils
          └── math.test.js
    └── utils
       ├── database.js
       └── math.js
```

### env.template

File that references all the required environment variables to push in the `.env` file

## Getting started

### Clone the repository

```
git clone <repository_name>
```

### Install dependencies

```
npm install
```

### Environment variables

Add a `.env` file at the project root to manage your environment variables.  
All required variables can be found in the `env.template` file but you need to add your own values to each variables.

### Fill the database
A CLI is available to fill or clean the database with development data under the folder `src/dev-data`.

**import data**
```
node src/dev-data/import-dev-data.js --import
```

**delete data**
```
node src/dev-data/import-dev-data.js --delete
```

### Start

Before starting the application, make sure that you already have install the dependencies and adding all variables in your `.env` file.

Nodemon package is installed to launch and restart the application easyli after file's changing.

```
npm run start
```

### Debug
A script command is available to debug the node application using built-in node.js inspector.
Here is the [Node inspector documentation](https://nodejs.org/en/learn/getting-started/debugging)
```
npm run debug
```

### Lint

After writting some lines of code, you can check the encodding by using the eslint command. Eslint check by default the encoding after updated a file but is it important to verify the entire folder before the application building.

```
npm run lint
```

### Build

The bundler tool is `Webpack` to provide a dist folder using in deployment.

To build the application, run the following command in your terminal:
```
npm run build
```

### Test

The `tests` folder includes some tests for exisitng functions in th repository but it can be improved and update during you development process. These tests files use the built-in Node.js `test-runner` to avoid the import of an external package like `Jest` (but you're free to add your favorit testing tool).

To run the tests you can execute the following command in your terminal:

```
npm test
```
