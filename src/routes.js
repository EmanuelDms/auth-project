import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";
import { Router } from "express";
import checkCredentials from './middlewares/checkCrendentials';

const routes = new Router();
/* Using locally middleware
routes.post('/auth', checkCredentials, AuthController.store);*/

// Login a user and create its token
routes.post('/auth',AuthController.store);
// Create a user
routes.post('/users', UserController.store);

// Using globally middleware
routes.use(checkCredentials);

// Show users
routes.get('/users', UserController.show);

// Update a user
routes.put('/users', UserController.update);

// Delete a user
routes.delete('/users', UserController.delete);

export default routes;