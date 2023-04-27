describe('Esqueci minha senha', () => {

    it('Deve poder solicitar o resgate de senha', () => {

        const user = {
            name: 'João Esquecido',
            email: 'joao@gmail.com',
            password: 'abc123',
            is_shaver: false
        }

        cy.createUser(user)

        cy.requestPassword(user.email)

        const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'
        cy.noticeSuccessShouldBe(message)
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
            cy.resetPassword(Cypress.env('passToken'), 'def123', 'def123')

            const message = 'Agora você já pode logar com a sua nova senha secreta.'
            cy.noticeSuccessShouldBe(message)
        })

        afterEach(() => {
            cy.submitLogin(user.email, 'def123')
            cy.userShouldBeLoggedIn(user.name)
        })

    })

})