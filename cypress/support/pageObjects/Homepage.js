class Homepage{

    getNamebox()
    {
        return cy.get(':nth-child(1) > .form-control')
    }

    getGenderBox(){
        return cy.get('select')
    }

    getTwowayBindingBox(){
        return cy.get(':nth-child(4) > .ng-untouched')
    }

    getEmploymentEntrepreneur(){
        return cy.get('.form-check-input')
    }

    getShopButton(){
        return cy.get(':nth-child(2) > .nav-link')
    }

}
export default Homepage;