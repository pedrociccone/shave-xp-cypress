import data from '../fixtures/users-signup.json'

describe('Cadastro de novo usuário', () => {
    context('Quando submeto o formulário', () => {
        it('Novo usuário cadastrado com sucesso', () => {
            const user = data.success

            cy.deleteUser(user)

            cy.signup(user.name, user.email, user.password)

            const message = 'Boas vindas, faça login para solicitar serviços!'
            cy.noticeSuccessShouldBe(message)
        })

        it('Não deve cadastrar com email já cadastrado', () => {
            const user = data.existinguser

            cy.signup(user.name, user.email, user.password)

            const message = 'Oops! E-mail já cadastrado.'
            cy.noticeErrorShouldBe(message)
        })

        it('Campos obrigatórios', () => {
            cy.signup()

            cy.get('.alert-error')
                .should('have.length', 3)
                // The '$' indicates that you are looking for an HTML element
                .and(($small) => {
                    expect($small.get(0).textContent).to.equal('Nome é obrigatório')
                    expect($small.get(1).textContent).to.equal('E-mail é obrigatório')
                    expect($small.get(2).textContent).to.equal('Senha é obrigatória')
                })
        })
    })

    context('Senha muito curta', () => {
        data.shortpass.forEach((p) => {
            it(`Não deve cadastrar com a senha: ${p}`, () => {
                cy.signup('Paulo Silva Dos Santos', 'paulosilva@gmail.com', p)
                cy.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('Email no formato incorreto', () => {
        data.invemails.forEach((e) => {
            it(`Não deve cadastrar com o e-mail: ${e}`, () => {
                cy.signup('Paulo Silva Dos Santos', e, 'qax123')
                cy.alertShouldBe('Informe um email válido')
            })
        })
    })
})