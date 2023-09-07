describe('first test suite',function(){

it('first testcase',function(){
    //cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
    cy.visit("seleniumPractise/#")
    cy.get('.search-keyword').type('ca')
    cy.get('.products').find('.product').each(($el,index,$list)=>{
        const textVeg= $el.find('h4.product-name').text()
        if(textVeg.includes('Cauliflower'))
        {
        cy.wrap($el).find('button').click()
        }         
})
    cy.get('.cart-icon > img').click()
    cy.contains('PROCEED TO CHECKOUT').click()
    cy.contains('Place Order').click()
    cy.get('select').select('India').should('have.value','India')
    cy.get('.chkAgree').check().should('be.checked')
    cy.get('button').click()
    cy.get('[style="color:green;font-size:25px"]').contains('Thank you')

})
})