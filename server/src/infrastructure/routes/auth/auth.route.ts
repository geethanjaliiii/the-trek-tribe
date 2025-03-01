import { Request, Response } from "express";
import { BaseRoute } from "../baseRoute";
import { registerUserController } from "../../di/resolver";

export class AuthRoutes extends BaseRoute {
    constructor(){
        super();
    }
    protected initializeRoutes(): void {
       this.router.post('/register', (req: Request, res: Response) => {
        registerUserController.handle(req, res);
       })
    }
    
}