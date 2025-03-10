import { Request, Response } from "express";
import { authorizeRole, verifyAuth } from "../../../interface-adapters/middlewares/authentication.middleware";
import { BaseRoute } from "../baseRoute";
import { requestVerificationController } from "../../di/resolver";

export default class VendorRoutes extends BaseRoute {

    constructor(){
        super();
    }
    protected initializeRoutes(): void {
        this.router.post('/vendor/verify',
            verifyAuth,
            authorizeRole(['vendor']),
            (req:Request,res:Response)=>
                requestVerificationController.handle(req,res)
        )
    }
}