## DIRECTORIES

manually created for the sake of organization

|directory|description|
|-|-|
|`/src/routes`| handles http data<br>calls the validator<br>calls the services<br>calls the middleware |
|`/src/validator`| creates the migration file|
|`/src/controller`| handles data logic |
|`/src/repository`| handles database communication<br>returns simple results and atomic database actions |
|`/src/model`| creates models to guarantee data shape |
|`/src/config`| loads app configuration, such as environment values and the database connection |
|`/src/middleware`| holds Express middleware that runs before a controller or handles errors after routes |

### MIDDLEWARE
you can call middleware at three levels:
App level — in src/index.ts with app.use(...).
Router level — in a file like src/routes/*.routes.ts with router.use(...).
- Example: friendRouter.use(requireAuth) would run for every /friends route.
Route level — on one endpoint.
- Example: friendRouter.post('/', requireAuth, createFriend).
Choose the level by scope: 
- global behavior -> app, 
- all routes in a feature -> router, 
- one endpoint -> that route. 