import shared from '../../shared'

class SignupPage {

    constructor() {
        this.shared = shared
    }

    submit(name = null, email = null, password = null) {
        cy.visit('/signup')

        cy.get('input[placeholder="Nome completo"]').as('name')
        cy.get('input[placeholder="Seu melhor email"]').as('email')
        cy.get('input[placeholder="Sua senha secreta"]').as('password')

        if (name) {
            cy.get('@name').type(name)
        }

        if (email) {
            cy.get('@email').type(email)
        }

        if (password) {
            cy.get('@password').type(password)
        }

        cy.contains('button', 'Cadastrar')
            .click()
    }

    requiredFields(nameMessage, emailMessage, passwordMessage) {
        cy.get('.alert-error')
            .should('have.length', 3)
            // The '$' indicates that you are looking for an HTML element
            .and(($small) => {
                expect($small.get(0).textContent).to.equal(nameMessage)
                expect($small.get(1).textContent).to.equal(emailMessage)
                expect($small.get(2).textContent).to.equal(passwordMessage)
            })
    }
}

export default new SignupPage()