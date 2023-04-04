
import signupPage from '../support/pages/signup'

import data from '../fixtures/users-signup.json'

describe('Cadastro de novo usuário', () => {

    context('Quando submeto o formulário', () => {
        it('Novo usuário cadastrado com sucesso', () => {
            const user = data.success

            cy.deleteUser(user.email)

            signupPage.submit(user.name, user.email, user.password)

            const message = ' Boas vindas, faça login para solicitar serviços!'
            signupPage.noticeShouldBe(message)
        })

        it('Não deve cadastrar com email já cadastrado', () => {

            const user = data.existinguser

            signupPage.submit(user.name, user.email, user.password)

            const message = ' Oops! E-mail já cadastrado.'
            signupPage.noticeShouldBe(message)
        })

        it('Campos obrigatórios', () => {
            signupPage.submit()
            signupPage.requiredFields('Nome é obrigatório', 'E-mail é obrigatório', 'Senha é obrigatória')
        })
    })

    context('Senha muito curta', () => {
        data.shortpass.forEach((p) => {
            it(`Não deve cadastrar com a senha: ${p}`, () => {
                signupPage.submit('Paulo Silva Dos Santos', 'paulosilva@gmail.com', p)
                signupPage.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('Email no formato incorreto', () => {
        data.invemails.forEach((e) => {
            it(`Não deve cadastrar com o e-mail: ${e}`, () => {
                signupPage.submit('Paulo Silva Dos Santos', e, 'qax123')
                signupPage.alertShouldBe('Informe um email válido')
            })
        })
    })
})