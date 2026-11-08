//index.js

// Import the express with express name
import express from 'express';

// Initialize the express module with app variable
const app: express.Application = express();

// Define the port for the application is run
const port: number = Number(process.env.APP_PORT) || 3000;;

// Handle the coming data.
app.use(express.json());

// Handle '/', path of the api.
app.get('/', (_req, _res): void => {
    _res.json({
        'name': 'typescritp_api',
        'path': '/',
        'work': 'search_other_apis'
    });
});

let fake_db: object[] = [];
// Handle '/create', path for create user
app.post('/create', (_req, _res): void => {

    // Fetched the user using body data
    const user: object = _req.body;

    // Assign the user in fake_db with id as a index
    fake_db.push(user);

    _res.json({
        "success": true,
        "data": fake_db
    });
});


// Server the api endpoints.
app.listen(port, (): void => {
    console.log(`Typescript API server http://localhost:${port}/`);
});