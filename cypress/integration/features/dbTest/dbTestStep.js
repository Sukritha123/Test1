/// <reference types ="Cypress" />

import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

    
Given(/^User is connected to db$/, () => {
	cy.sqlServer("SELECT *  FROM [Person Name]").then(function(result)
    {
        console.log(result[1])
    })
});
