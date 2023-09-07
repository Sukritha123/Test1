/// <reference types ="Cypress" />
import Homepage from '../../support/pageObjects/Homepage.js'
import Shoppage from '../../support/pageObjects/Shoppage.js'
import Checkoutpage from '../../support/pageObjects/Checkoutpage'


describe('test framework',function(){
before(function(){
    cy.fixture("example").then(function(data)
    {
        this.data=data
    }
    )
})

it('first framework',function(){
    //Cypress.config('defaultCommandTimeout', 6000) //did not work for me
    const homepage = new Homepage()
    const shoppage = new Shoppage()
    const checkoutpage = new Checkoutpage()

    cy.visit("angularpractice/") //using baseUrl
    //cy.visit(Cypress.env('url')+"angularpractice/") //using env:url

    //type name
    homepage.getNamebox().type(this.data.name)
    //type gender
    homepage.getGenderBox().select(this.data.gender)
    //check 2 way binding
    homepage.getTwowayBindingBox().should('have.value',this.data.name)
    //check radio button is disabled
    homepage.getEmploymentEntrepreneur().should('be.disabled')
    //validate Dom has minumum length 2
    homepage.getNamebox().should('have.attr','minlength','2')
    //click on shop button
    homepage.getShopButton().click()
    
    //select product
    this.data.productList.forEach(function (element) {
        cy.selectProduct(element) //Custom Command
      });
    //click on checkout
    shoppage.getCheckout().click()  

    //**********sum of totals - START**********//
    //get price and sum price
    var sum =0;
    cy.get('tbody tr td:nth-child(4) strong').each(($el,index,$list)=>{
        const textVal= $el.text()
        var tval =textVal.split(' ')
        tval = tval[1].trim()

        sum=Number(sum)+Number(tval)
               
    })
    //validate the above summed price with total
    cy.get("h3 strong").then(function(element){
        const textVal= element.text()
        var tval =textVal.split(' ')
        tval = tval[1].trim()
        expect(Number(tval)).to.equal(sum)
    }
    )
    //**********sum of totals - END**********//
    
    //click on checkout
    checkoutpage.getCheckout().click()

    //type delivery country
    cy.get("#country").type('India')
    //click on the country dropdown
    cy.get(".suggestions ul li a").click()
     
    //click on T&C checkbox
    //cy.get('.checkbox').click() //works correctly
    cy.get('#checkbox2').click({force:true})

    //click on purchase
    cy.get('.ng-untouched > .btn').click()

    //validate display message
    //cy.get('.alert strong').should('have.text','Success!') //works correctly
    cy.get('.alert').then(function(element)
    {
        const actualText = element.text()
        expect(actualText.includes("Success")).to.be.true

    })

})
})