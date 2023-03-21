
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

describe('Login', () => {

    context('Quando submeto o formulário', () => {

        it('Deve logar com sucesso', () => {
            const user = {
                name: 'Pedro',
                email: 'pedrocicc14@gmail.com',
                password: 'qax123'
            }

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

        it('Não deve logar com senha incorreta', () => {
            const user = {
                name: 'Pedro',
                email: 'pedrocicc14@gmail.com',
                password: 'qax456'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)
        })

        it('Não deve logar com email não cadastrado', () => {
            const user = {
                name: 'Pedro',
                email: 'pedrocicc@gmail.com',
                password: 'qax456'
            }

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

        const passwords = [
            '1',
            '12',
            '123',
            '1234',
            '12345'
        ]

        // p = unit from the test vector
        passwords.forEach((p) => {
            it(`Não deve logar com a senha: ${p}`, () => {
                loginPage.submit('pedrocicc14@gmail.com', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')
            })
        })

    })

    context('Email no formato incorreto', () => {

        const emails = [
            'pedro&gmail.com',
            'pedro.com.br',
            '@gmail.com',
            '@',
            'pedro@',
            '12313432',
            '#@$$!#@',
            'xpars3213'
        ]

        emails.forEach((e) => {
            it(`Não deve logar com o e-mail: ${e}`, () => {
                loginPage.submit(e, 'qax123')
                loginPage.alertShouldBe('Informe um email válido')
            })
        })

    })

})