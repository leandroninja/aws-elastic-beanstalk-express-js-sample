# AWS Elastic Beanstalk — App Express.js

Aplicação web Node.js modernizada com [Express](https://expressjs.com/), pronta para deploy no AWS Elastic Beanstalk. Inclui headers de segurança, rate limiting, validação de entrada, tratamento de erros centralizado, health check e suite de testes completa.

## Requisitos

- Node.js >= 18 (20 LTS recomendado — veja `.nvmrc`)
- npm >= 9

## Primeiros passos

```bash
# 1. Instalar dependências
npm install

# 2. Criar o .env a partir do exemplo
cp .env.example .env

# 3. Iniciar o servidor em modo desenvolvimento (reinicia automaticamente)
npm run dev

# 4. Ou iniciar em modo produção
npm start
```

O servidor sobe em `http://localhost:8080` por padrão.

## Variáveis de ambiente

| Variável   | Padrão        | Descrição                        |
|------------|---------------|----------------------------------|
| `NODE_ENV` | `development` | Ambiente de execução             |
| `PORT`     | `8080`        | Porta que o servidor vai escutar |
| `HOST`     | `0.0.0.0`    | Endereço de bind                 |

Copie `.env.example` para `.env` e ajuste conforme necessário.

## Endpoints da API

### `GET /`
Retorna um payload JSON de boas-vindas.

```json
{
  "message": "Welcome to the AWS Elastic Beanstalk Express.js Sample App",
  "version": "2.0.0",
  "environment": "development"
}
```

### `GET /health`
Endpoint de health check usado por load balancers e ferramentas de monitoramento.

```json
{
  "status": "ok",
  "uptime": 12345,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### `POST /echo`
Retorna a mensagem enviada. Útil para testar o fluxo de requisições.

**Body** (JSON):
```json
{ "message": "olá mundo" }
```

**Resposta:**
```json
{ "echo": "olá mundo" }
```

Validação: `message` é obrigatório e deve ter no máximo 500 caracteres.

## Scripts

| Script                   | Descrição                              |
|--------------------------|----------------------------------------|
| `npm start`              | Inicia o servidor (produção)           |
| `npm run dev`            | Inicia com nodemon (modo watch)        |
| `npm test`               | Executa os testes (Jest)               |
| `npm run test:coverage`  | Testes com relatório de cobertura      |
| `npm run lint`           | Verifica o código com ESLint           |
| `npm run lint:fix`       | Corrige problemas de lint automaticamente |

## Estrutura do projeto

```
.
├── src/
│   ├── app.js              # Factory do app Express
│   ├── server.js           # Servidor HTTP + graceful shutdown
│   ├── routes/
│   │   ├── index.js        # Rotas principais (GET /, POST /echo)
│   │   └── health.js       # Rota de health check
│   └── middleware/
│       ├── errorHandler.js # Tratamento global de erros
│       └── notFound.js     # Handler 404
├── tests/
│   └── app.test.js         # Testes de integração (Jest + supertest)
├── .env.example            # Modelo de variáveis de ambiente
├── .nvmrc                  # Versão do Node (20 LTS)
├── eslint.config.js        # Configuração ESLint flat config
├── jest.config.js          # Configuração do Jest
├── nodemon.json            # Configuração do Nodemon
└── app.js                  # Entry point do AWS EB (delega para src/)
```

## Funcionalidades

- **Segurança** — Headers HTTP com [Helmet](https://helmetjs.github.io/)
- **Rate limiting** — 100 requisições por 15 minutos por IP
- **Validação de entrada** — [express-validator](https://express-validator.github.io/) nos endpoints POST
- **Tratamento de erros** — Middleware centralizado com stack trace em desenvolvimento
- **Logging** — Logger HTTP [Morgan](https://github.com/expressjs/morgan)
- **CORS** — Suporte a requisições cross-origin
- **Graceful shutdown** — Trata `SIGTERM`/`SIGINT` para reinicializações limpas
- **Health check** — Endpoint `/health` para ALB e Beanstalk
- **Configuração por env** — Suporte a [dotenv](https://github.com/motdotla/dotenv)

## Deploy no AWS Elastic Beanstalk

O AWS EB executa automaticamente `npm start`, que chama `node src/server.js`. A aplicação sobe em `0.0.0.0:8080` por padrão, que é a porta que o EB usa como proxy.

```bash
# Usando o EB CLI
eb init
eb create meu-ambiente
eb deploy
```

## Segurança

Consulte [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) para notificação de problemas de segurança.

## Licença

Este projeto está licenciado sob a licença MIT-0. Veja o arquivo [LICENSE](LICENSE).
