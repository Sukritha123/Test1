declare namespace Cypress {
    interface Chainable<Subject> {
        selectProduct(productname: any): Chainable<any>
  }
}