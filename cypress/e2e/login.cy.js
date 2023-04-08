import data from '../fixtures/users-login.json'

describe('Login', () => {

    context('Quando submeto o formulário', () => {
        it('Deve logar com sucesso', () => {
            const user = data.success
            cy.createUser(user)

            cy.submitLogin(user.email, user.password)
            cy.userShouldBeLoggedIn(user.name)
        })

        it('Não deve logar com senha incorreta', () => {
            const user = data.invpass

            cy.submitLogin(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            cy.noticeErrorShouldBe(message)
        })

        it('Não deve logar com email não cadastrado', () => {
            const user = data.email404

            cy.submitLogin(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            cy.noticeErrorShouldBe(message)
        })

        it('Campos obrigatórios', () => {
            cy.submitLogin()

            cy.get('.alert-error')
                .should('have.length', 2)
                .and(($small) => {
                    expect($small.get(0).textContent).to.equal('E-mail é obrigatório')
                    expect($small.get(1).textContent).to.equal('Senha é obrigatória')
                })
        })
    })

    context('Senha muito curta', () => {
        // p = unit from the test vector
        data.shortpass.forEach((p) => {
            it(`Não deve logar com a senha: ${p}`, () => {
                cy.submitLogin('pedrocicc14@gmail.com', p)
                cy.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('Email no formato incorreto', () => {
        data.invemails.forEach((e) => {
            it(`Não deve logar com o e-mail: ${e}`, () => {
                cy.submitLogin(e, 'qax123')
                cy.alertShouldBe('Informe um email válido')
            })
        })
    })

})