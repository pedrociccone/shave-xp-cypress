import data from '../fixtures/order.json'

describe('Pedido', () => {

    const { customer, shaver, service } = data

    context('Usuário logado', () => {

        before(() => {
            cy.createUser(customer)
            cy.apiLogin(customer)
        })

        it('Deve poder solicitar serviços', () => {
            cy.selectShaver(shaver.name)
            cy.selectService(service.description)
            cy.confirmOrder()
            cy.hasOrder()
        })

    })

})