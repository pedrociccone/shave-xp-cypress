import fpPage from '../support/pages/views/forgot-pass'
import rpPage from '../support/pages/views/reset-pass'
import loginPage from '../support/pages/views/login'
import shaversPage from '../support/pages/views/shavers'

describe('Esqueci minha senha', () => {

    it('Deve poder solicitar o resgate de senha', () => {

        const user = {
            name: 'João Esquecido',
            email: 'joao@gmail.com',
            password: 'abc123',
            is_shaver: false
        }

        cy.createUser(user)

        fpPage.go()
        fpPage.submit(user.email)

        const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'
        fpPage.noticeShouldBe(message)

    })

    // The next test is the second part of the previous one.
    // They are isolated because they belong to different features and pages.
    // In the previous one, the user could choose to not continue with the flow,
    // if he'd remember the password.
    // The first test is the one where the user asks for a password change. -> Belongs to /forgot-password
    // The second test is the one where he actually changes it. -> Belongs to /reset-password

    context('Quando o usuário solicita resgate de senha', () => {

        const user = {
            name: 'João Esquecido',
            email: 'joao@gmail.com',
            password: 'abc123',
            is_shaver: false
        }

        beforeEach(() => {
            cy.createUser(user)
            cy.recoverPass(user.email)
            cy.getToken(user.email)
        })

        it('Deve poder cadastrar uma nova senha', () => {
            rpPage.go(Cypress.env('passToken'))
            rpPage.submit('def123', 'def123')

            const message = 'Agora você já pode logar com a sua nova senha secreta.'
            rpPage.noticeShouldBe(message)
        })

        afterEach(() => {
            loginPage.submit(user.email, 'def123')
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

    })

})