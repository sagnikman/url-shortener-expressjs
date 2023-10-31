# URL Shortener using ExpressJS and EJS

Deployed Link: **[turl.fly.dev](https://turl.fly.dev/)** 

This is a URL Shortener service for creating short URLs for a given long URL. The short URL redirects to the original long URL. You can use random generated or custom short code(slug) for short URL.

Tech Stack: ExpressJS, EJS Templates, PostgreSQL Database, Redis for caching

## API Endpoints

### URL
#### `POST https://turl.fly.dev/api/v1/urls`
- Save a long url with slug, if the slug is empty then it will generate random slug

- Request Body:
    - ```json
        {
            "shortCode": "",
            "slug": "",
            "longUrl": "https://www.google.com/search?q=url+shortener"
        }
        ```
- Response:
    - ```json
        {
            "success": true,
            "message": "Successfully created a url",
            "data": {
                "id": 84,
                "shortCode": "368963071827",
                "slug": "G4jr1n7",
                "longUrl": "https://www.google.com/search?q=url+shortener",
                "updatedAt": "2023-10-31T19:29:36.579Z",
                "createdAt": "2023-10-31T19:29:36.579Z"
            },
            "error": {}
        }
        ```

#### `GET https://turl.fly.dev/api/v1/urls`
- Get all URLs data

#### `GET https://turl.fly.dev/api/v1/urls/{id}`
- Create a URL data by id

#### `PUT https://turl.fly.dev/api/v1/urls/{id}`
- Update a URL data by id

#### `DELETE https://turl.fly.dev/api/v1/urls`
- Delete a URL data by id


## Web Endpoint

#### `https://turl.fly.dev/{slug}`
- Redirects to the original long URL
    - The first request gets long URL data from Postgres database and then the long URL data is saved in Redis. All subsequent requests retrieves the data from the cache until it expires.


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
5. Configure `config.js` with your database details.
6. Run the server for development.
```sh
npm run dev
```

