# Node.js DDD Example

[![CI Pipeline](https://github.com/Miczeq22/nodejs-ddd-example/actions/workflows/ci-pipeline.yaml/badge.svg)](https://github.com/Miczeq22/nodejs-ddd-example/actions/workflows/ci-pipeline.yaml)

This project shows a simple example how to write Tactical Domain Driven Design in Node.js

### Domain

Another TODO list? Yes, the domain must be quite simple to understand the concepts, but to not finish on simple CRUD we will ad few extra business rules:
- Only registered users can add TODO.
- We accept only emails from gmail and outlook domains.
- User can have maximum of 10 active todos
- To complete todo user need to describe how the todo was completed
- User can share todos by providing user nickname, shared todo can be completed by multiple users

### Stack
We are not going to use any framework simple `express.js` with `TypeScript` will do the work.

### Requirements
Installed `Docker`, `docker-compose` and `Node.js`.

### Scripts

- `npm run dev` - will run application in development mode
- `npm run build` - will build application to JS
- `npm run build:docker` - will build Docker image
- `npm run test` - will run all tests
- `npm run test:watch` - will run all tests in watch mode
- `npm run lint` - will run eslint check
- `npm run format` - will run prettier on all files