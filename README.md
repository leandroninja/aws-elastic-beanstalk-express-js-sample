# AWS Elastic Beanstalk Express.js Sample App

A modernized Node.js web application built with [Express](https://expressjs.com/), designed for deployment on AWS Elastic Beanstalk. Includes security headers, rate limiting, input validation, structured error handling, health check, and a full test suite.

## Requirements

- Node.js >= 18 (20 LTS recommended — see `.nvmrc`)
- npm >= 9

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Create your .env from the example
cp .env.example .env

# 3. Start the dev server (auto-restart on changes)
npm run dev

# 4. Or start in production mode
npm start
```

The server listens on `http://localhost:8080` by default.

## Environment Variables

| Variable   | Default       | Description               |
|------------|---------------|---------------------------|
| `NODE_ENV` | `development` | Runtime environment       |
| `PORT`     | `8080`        | Port the server listens on |
| `HOST`     | `0.0.0.0`    | Bind address              |

Copy `.env.example` to `.env` and adjust as needed.

## API Endpoints

### `GET /`
Returns a welcome JSON payload.

```json
{
  "message": "Welcome to the AWS Elastic Beanstalk Express.js Sample App",
  "version": "2.0.0",
  "environment": "development"
}
```

### `GET /health`
Health check endpoint used by load balancers and monitoring tools.

```json
{
  "status": "ok",
  "uptime": 12345,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### `POST /echo`
Echoes back the provided message. Useful for testing request flow.

**Body** (JSON):
```json
{ "message": "hello world" }
```

**Response:**
```json
{ "echo": "hello world" }
```

Validation: `message` is required and must be 500 characters or fewer.

## Scripts

| Script             | Description                        |
|--------------------|------------------------------------|
| `npm start`        | Start server (production)          |
| `npm run dev`      | Start server with nodemon (watch)  |
| `npm test`         | Run test suite (Jest)              |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint`     | Lint source files (ESLint)         |
| `npm run lint:fix` | Lint and auto-fix                  |

## Project Structure

```
.
├── src/
│   ├── app.js              # Express app factory
│   ├── server.js           # HTTP server + graceful shutdown
│   ├── routes/
│   │   ├── index.js        # Main routes (GET /, POST /echo)
│   │   └── health.js       # Health check route
│   └── middleware/
│       ├── errorHandler.js # Global error handler
│       └── notFound.js     # 404 handler
├── tests/
│   └── app.test.js         # Integration tests (Jest + supertest)
├── .env.example            # Environment variable template
├── .nvmrc                  # Node version (20 LTS)
├── eslint.config.js        # ESLint flat config
├── jest.config.js          # Jest configuration
├── nodemon.json            # Nodemon configuration
└── app.js                  # AWS EB entry point (delegates to src/)
```

## Features

- **Security** — [Helmet](https://helmetjs.github.io/) HTTP security headers
- **Rate limiting** — 100 requests per 15 minutes per IP
- **Input validation** — [express-validator](https://express-validator.github.io/) on POST endpoints
- **Error handling** — Centralized error middleware with stack traces in dev
- **Logging** — [Morgan](https://github.com/expressjs/morgan) HTTP request logger
- **CORS** — Cross-origin resource sharing support
- **Graceful shutdown** — Handles `SIGTERM`/`SIGINT` for clean restarts
- **Health check** — `/health` endpoint for ALB / Beanstalk health checks
- **Env config** — [dotenv](https://github.com/motdotla/dotenv) support

## Deploying to AWS Elastic Beanstalk

AWS EB will automatically run `npm start`, which calls `node src/server.js`. The app binds to `0.0.0.0:8080` by default, which is the port EB proxies to.

```bash
# Using the EB CLI
eb init
eb create my-env
eb deploy
```

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for security issue notifications.

## License

This project is licensed under the MIT-0 License. See the [LICENSE](LICENSE) file.
