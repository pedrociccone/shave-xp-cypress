#language: pt

Funcionalidade: Login

Cenario: Login do cliente

    Dado que tenho o seguinte usuário:
        |name       |Pedro Ciccone          |
        |email      |pedrocicc14@gmail.com  |
        |password   |qax123                 |
        |is_shaver  |false                  |
    E que acesso o totem
    Quando submeto essas credenciais
    Então sou autenticado com sucesso

Cenario: Senha incorreta

    Dado que tenho o seguinte usuário:
        |name       |Joseph Rudolph         |
        |email      |joseph@gmail.com       |
        |password   |qax123                 |
        |is_shaver  |false                  |
    E que esse usuário tem senha incorreta
    E que acesso o totem
    Quando submeto essas credenciais
    Então devo ver a mensagem de alerta "Ocorreu um erro ao fazer login, verifique suas credenciais."
