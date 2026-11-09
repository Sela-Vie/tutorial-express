//index.ts

// Import the express with express name
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import friendRouter from './routes/friend.routes';
import { errorHandler } from './middleware/error.middleware';
import { openApiSpec } from './config/openapi';

// Initialize the express module with app variable
const app: express.Application = express();

// Define the port for the application is run
const port: number = Number(process.env.APP_PORT) || 3000;

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

let object_saved: object[] = [];
app.post('/test', (_req, _res): void => {
    const object_input: object = _req.body;
    object_saved.push(object_input);
    if (object_saved.length > 5){
        object_saved.pop()
    }
    _res.json({
        "success": true,
        "data": object_saved
    });
});

// Serve the OpenAPI document and Swagger UI.
app.get('/openapi.json', (_req, _res): void => {
    _res.json(openApiSpec);
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// Handle the friend CRUD endpoints.
app.use('/friends', friendRouter);

// Handle errors after all routes.
app.use(errorHandler);

// Server the api endpoints.
app.listen(port, (): void => {
    console.log(`Typescript API server http://localhost:${port}/`);
});