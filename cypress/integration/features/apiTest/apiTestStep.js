/// <reference types ="Cypress" />

import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";


Given(/^User visits website$/, () => {
    cy.visit("angularAppdemo/")
});

When(/^User clicks on Library button$/, () => {

    cy.intercept({
        method: 'GET',
        url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
    }, {
        statusCode: 200,
        body:
            [{ "book_name": "RobotFramework", "isbn": "984353", "aisle": "982053" }]

    }).as('oneBook')

    cy.get('.btn-primary').click()

});

Then(/^Details of 1 book is displayed$/, () => {
    cy.wait('@oneBook').should(({ request, response }) => {
        cy.get('tr').should('have.length', response.body.length + 1)

    })
    cy.get('p').should('have.text', 'Oops only 1 Book available')
    cy.get('@oneBook').should(({ request, response }) => {
        expect(request.url).to.include('Book')
        expect(request.method).to.equal('GET')
    })
    cy.get('@oneBook').then(console.log)
    });


    When(/^User accesses library page as a different user$/, () => {
        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (req) => {
            req.url = 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra'

            req.continue((res) => {
                expect(res.statusCode).to.equal(404)

            })
        }).as("dummy")
    });

    Then(/^404 error is displayed$/, () => {
        cy.get('.btn-primary').click()
        cy.wait('@dummy')

    });


    Then(/^book is added using POST Method$/, () => {
        cy.request('POST', 'http://216.10.245.166/Library/Addbook.php',
            {
                "name": "Learn ABCDEFgggf",
                "isbn": "ABCDEFgggf",
                "aisle": "33333",
                "author": "ABCDEFgggf"
            }).then((response) => {
                expect(response.body).to.have.property('Msg', 'successfully added')
                expect(response.status).to.eq(200)
            })
    });
