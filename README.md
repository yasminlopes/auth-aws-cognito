# Autenticação com AWS Cognito

Este projeto implementa um sistema de autenticação utilizando o AWS Cognito. Ele inclui funcionalidades como cadastro de usuário, confirmação de conta, login, recuperação de senha e perfil de usuário.

## Estrutura do Projeto

- **src/functions/auth**: Contém as funções relacionadas à autenticação, como registro, login, confirmação de conta, recuperação de senha e redefinição de senha.
- **src/functions**: Contém outras funções, como a função de perfil de usuário.
- **src/utils**: Contém funções utilitárias
- **src/libs**: Contém bibliotecas e clientes, como o cliente Cognito
- **src/validators**: Contém validators personalizados

## Configuração

### Pré-requisitos

- Node.js (versão 20.x)
- Serverless Framework (versão 4.6.4)
- AWS CLI configurado com permissões adequadas

### Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/yasminlopes/auth-aws-cognito
    cd auth-aws-cognito
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

### Configuração do AWS Cognito

1. Configure o arquivo `serverless.yml` com os detalhes do seu pool de usuários Cognito e cliente.

### Implantação

1. Implante o serviço usando o Serverless Framework:
    ```sh
    serverless deploy
    ```

## Endpoints

### Registro de Usuário

- **Método**: POST
- **Caminho**: `/auth/sign-up`
- **Descrição**: Registra um novo usuário.
- **Payload**:
    ```json
    {
      "email": "usuario@example.com",
      "password": "SenhaForte123!",
      "firstName": "Nome",
      "lastName": "Sobrenome"
    }
    ```

### Confirmação de Conta

- **Método**: POST
- **Caminho**: `/auth/account-confirmation`
- **Descrição**: Confirma a conta do usuário com um código de confirmação.
- **Payload**:
    ```json
    {
      "email": "usuario@example.com",
      "code": "123456"
    }
    ```

### Login

- **Método**: POST
- **Caminho**: `/auth/sign-in`
- **Descrição**: Autentica um usuário e retorna tokens de acesso.
- **Payload**:
    ```json
    {
      "email": "usuario@example.com",
      "password": "SenhaForte123!"
    }
    ```

### Recuperação de Senha

- **Método**: POST
- **Caminho**: `/auth/forgot-password`
- **Descrição**: Envia um código de recuperação de senha para o e-mail do usuário.
- **Payload**:
    ```json
    {
      "email": "usuario@example.com"
    }
    ```

### Redefinição de Senha

- **Método**: POST
- **Caminho**: `/auth/reset-password`
- **Descrição**: Redefine a senha do usuário usando o código de recuperação.
- **Payload**:
    ```json
    {
      "email": "usuario@example.com",
      "code": "123456",
      "newPassword": "NovaSenhaForte123!"
    }
    ```

### Perfil de Usuário

- **Método**: GET
- **Caminho**: `/profile`
- **Descrição**: Retorna os detalhes do perfil do usuário autenticado.

## Personalização de E-mails

Este projeto também inclui a personalização dos e-mails enviados aos usuários para confirmação de conta e recuperação de senha. Os templates de e-mail são definidos na função `cognitoCustomMessage`.

