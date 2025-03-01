import { Router } from "express";

export abstract class BaseRoute {
    //abstract class enforce consistency for related classs,but cannot create instance of AC
    public router: Router;
    constructor(){
        this.router = Router();
        this.initializeRoutes()
    }
    protected abstract initializeRoutes(): void;//enforce every route must follow its own
}