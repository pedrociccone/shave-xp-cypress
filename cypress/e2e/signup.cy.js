
import SignupPage from '../support/pages/signup'

// const { deleteUser } = require('../../api/db')

describe('Cadastro de novo usuário', () => {

    it.skip('Novo usuário cadastrado com sucesso', () => {
        const user = {
            name: 'Paulo Silva Dos Santos',
            email: 'paulosilva@gmail.com',
            password: 'qax123',
            is_shaver: false
        }
        
        // deleteUser(user.email)
        
        SignupPage.submit(user.name, user.email, user.password)

        const message = 'Boas vindas, faça login para solicitar serviços!'
        SignupPage.noticeShouldBe(message)
    })

    it('Não deve cadastrar com email já cadastrado', () => {

        const user = {
            name: 'Paulo Silva Dos Santos',
            email: 'paulosilva@gmail.com',
            password: 'qax123',
            is_shaver: false
        }

        SignupPage.submit(user.name, user.email, user.password)

        const message = 'Oops! E-mail já cadastrado.'
        SignupPage.noticeShouldBe(message)
    })

    it('Não deve cadastrar com email inválido', () => {
        const user = {
            name: 'Paulo Silva Dos Santos',
            email: 'paulosilvagmail.com',
            password: 'qax123',
            is_shaver: false
        }

        SignupPage.submit(user.name, user.email, user.password)

        const message = 'Informe um email válido'
        SignupPage.alertShouldBe(message)
    })

    it('Não deve cadastrar com senha inválida', () => {
        const user = {
            name: 'Paulo Silva Dos Santos',
            email: 'paulosilva@gmail.com',
            password: 'q',
            is_shaver: false
        }

        SignupPage.submit(user.name, user.email, user.password)

        const message = 'Pelo menos 6 caracteres'
        SignupPage.alertShouldBe(message)
    })

    it('Campos obrigatórios', () => {
        SignupPage.submit()
        SignupPage.requiredFields('Nome é obrigatório', 'E-mail é obrigatório', 'Senha é obrigatória')
    })

})