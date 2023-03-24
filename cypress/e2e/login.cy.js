
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

import data from '../fixtures/users-login.json'

describe('Login', () => {

    context('Quando submeto o formulário', () => {
        it.only('Deve logar com sucesso', () => {
            // Dado que eu tenho um NOVO usuário cadastrado
            const user = data.success
            cy.createUser(user)

            // Quando submeto o form de login com esse usuário
            loginPage.submit(user.email, user.password)

            // Então devo ser logado com sucesso
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

        it('Não deve logar com senha incorreta', () => {
            const user = data.invpass

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)
        })

        it('Não deve logar com email não cadastrado', () => {
            const user = data.email404

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)
        })

        it('Campos obrigatórios', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
        })
    })

    context('Senha muito curta', () => {
        // p = unit from the test vector
        data.shortpass.forEach((p) => {
            it(`Não deve logar com a senha: ${p}`, () => {
                loginPage.submit('pedrocicc14@gmail.com', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('Email no formato incorreto', () => {
        data.invemails.forEach((e) => {
            it(`Não deve logar com o e-mail: ${e}`, () => {
                loginPage.submit(e, 'qax123')
                loginPage.alertShouldBe('Informe um email válido')
            })
        })
    })

})