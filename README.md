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
    ├─── controllers
        └── controller.js
    ├─── middlewares
        └── middleware.js
    ├─── models
        └── model.js
    ├─── public
        └── index.html
    ├─── routes
        └── router.js
    ├─── server.js
    ├─── tests
        └── math.test.js
    └─── utils
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

### Run the application

Before starting the application, make sure that you already have install the dependencies and adding all variables in your `.env` file.

Nodemon package is installed to launch and restart the application easyli after file's changing.

```
npm start
```

### Try the application

If you're familiared with Postman or a similar tool, you can try to execute a request to test the application.

### Build the application

The bundler tool is `Webpack` to provide a dist folder using in deployment.

To build the application, run the following command in your terminal:
```
npm run build
```

### Test the application

The `tests` folder includes some tests for exisitng functions in th repository but it can be improved and update during you development process. These tests files use the built-in Node.js `test-runner` to avoid the import of an external package like `Jest` (but you're free to add your favorit testing tool).

To run the tests you can execute the following command in your terminal:

```
npm test
```
