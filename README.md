# Node.js Project Template

This is a base Node.js project template with best practices and project management recommendations.

## Project Structure

- **src**: The source code for the project.
- **config**: Configuration and setup for libraries and modules.
- **routes**: Registration of routes and associated middleware and controllers.
- **middlewares**: Request interception for validators and authenticators.
- **controllers**: Handling incoming requests and structuring API responses.
- **repositories**: Logic for interacting with the database.
- **services**: Business logic and database interactions.
- **utils**: Helper methods and error classes.

## Setup Instructions

1. Clone the repository from GitHub and open it in your text editor.
2. Run `npm install` in the project's root directory.
```sh
npm install
```
3. Copy `.env.example` file in project's root directory.
```sh
cp .env.example .env
```
4. Execute `npx sequelize init` in the `src` folder to set up migrations.
```sh
cd src/
npx sequelize init
```
5. Configure `config.json` with your database details.
6. Run the server for development.
```sh
npm run dev
```

