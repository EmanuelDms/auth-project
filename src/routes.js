import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";
import { Router } from "express";

const routes = new Router();

routes.post('/auth', AuthController.store);
routes.post('/users', UserController.store);

export default routes;