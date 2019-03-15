# Messenger Chatbot

Orquestrador criado para lidar com requisicões do facebook messenger e conversar com o bot criado no Watson Assistant.

## Getting Started

Essas intruções servirão para copiar o projeto e rodá-lo localmente para desenvolvimento. Veja deployment para saber como fazer o deploy do projeto na IBM Cloud.

### Prerequisites

Quais coisas você precisa instalar e como instalá-las.

- [Node.js](https://nodejs.org/en/)

  - Baixe a versão recomendada para os usuários comuns e siga as intruções corretamente.

- [Facebook Developer Account](https://developers.facebook.com/)

- [IBMCloud CLI](https://console.bluemix.net/docs/cli/reference/ibmcloud/download_cli.html#install_use)

- [IBM Cloud Account](https://console.bluemix.net/)

  - Crie uma conta gratuita na IBM Cloud, isso será suficiente para suprir nossa necessidade

- [Watson Assistant Instance](https://git.ng.bluemix.net/Arthur.grigoletto/voz-da-art-server/blob/master/docs/WatsonAssistant.md)

### Installing

#### 1. Instalando as dependências

No terminal navegue até o diretório do projeto e execute:

```bash
  npm install
  ou
  yarn add
```

Esse comando instalará todos os pacotes listados no nosso [package.json](https://github.com/arthurgrigoletto/messengerBot/blob/master/package.json)

#### 2. Criar arquivo .env

##### \* _Caso não tenha API Keys, por favor revise a parte de Prerequisites_

Com os serviços criados na IBM Cloud e as API Keys em mãos:

O arquivo _.env_ é de extrema importância, porque é dele que toda a aplicação busca as credenciais, ele fica localizado no diretório root. Um modelo para todas as Chaves está localizado no _[.envexample](https://github.com/arthurgrigoletto/messengerBot/blob/master/.env.example)_

##### \* _O arquivo .env não subirá para o gitHub_

#### 3. Rodando localmente o servidor

Há alguns scripts disponibilizados para facilitar na hora do desenvolvimento

- Esse comando rodará o servidor sem restartar automaticamente, a cada mudança será necessário parar o servidor no terminal e startar de novo.

  ```bash
    npm start
    ou
    yarn start
  ```

- Esse comando rodará o servidor ouvindo todas as mudanças que fizer no código, ou seja, ele sempre irá restartar o servidor a cada mudança

  ```bash
    npm run server
    ou
    yarn server
  ```

## Deployment

Veja [Deployment.md](https://github.ibm.com/Arthur-Grigoletto/voz-da-arte-server/blob/master/docs/Deployment.md)

## Built With

- [Node.js](https://nodejs.org/en/) - Usado como runtime
- [Yarn](https://yarnpkg.com/pt-BR/) - Usado como gerenciador de pacotes, como o npm(instalado por padrão pelo node.js)
- [Express](https://expressjs.com/pt-br/) - Usado como web Framework
- [ESLint](https://eslint.org/) - Usado para controle de escrita de código
- [Watson Assistant](https://www.ibm.com/cloud/watson-assistant/) - Usado para chatbots personalizados
- [Facebook Developers](https://developers.facebook.com/docs/messenger-platform)

## License

Esse projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.
