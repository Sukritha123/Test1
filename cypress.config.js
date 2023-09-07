const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default
const sqlServer = require('cypress-sql-server');

module.exports = defineConfig({
  projectId: 'yacbft',
  defaultCommandTimeout: 60000,
  //pageLoadTimeout: 60000,
  //for sql server

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('file:preprocessor', cucumber())
      //sql server related
      tasks = sqlServer.loadDBPlugin(config.env.db); //sql server related
      on('task', tasks); //sql server related
      //return tasks//sql server related
    },

    //specPattern: ['cypress/integration/examples/*.js','cypress/integration/testFolder/*.js'],
    specPattern: ['cypress/integration/features/*.feature'],
    baseUrl: 'https://rahulshettyacademy.com/'

  },
  env: {
    url: 'https://rahulshettyacademy.com/'
    //sql server related
  , db: {
    "userName": "sukritha.sethumani",//"sukritha.test",//"sukritha.sethumani", 
    "password": "SogetiMS@456",//"Sukritha1234",//"SogetiMS@456", 
    "server": "(localdb)\\LocalDb",
    "domain": "AD",
    "options": {
      "database": "Persons",
      "encrypt": false, //windows false, auth - true
      "trustServerCertificate": false, //windows
      "rowCollectionOnRequestCompletion": true
    }
  }
  }
  //,retries: {    runMode: 1  } //to retry the test on failure
  
});

