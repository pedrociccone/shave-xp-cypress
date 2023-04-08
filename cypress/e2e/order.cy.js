import loginPage from '../support/pages/views/login'
import shaversPage from '../support/pages/views/shavers'
import catalogPage from '../support/pages/views/catalog'
import orderPage from '../support/pages/views/order'

import data from '../fixtures/order.json'

describe('Pedido', () => {

    const { customer, shaver, service } = data

    context('Usuário logado', () => {

        before(() => {
            cy.createUser(customer)
            cy.apiLogin(customer)
        })

        it('Deve poder solicitar serviços', () => {
            shaversPage.selectShaver(shaver.name)
            catalogPage.hasShaver(shaver.name)

            catalogPage.selectService(service.description)
            catalogPage.hasTitle(service.description)
            
            catalogPage.confirmOrder()
            orderPage.hasOrder()
        })

    })

})