import { Request, Response } from "express";
import { authorizeRole, decodeToken, verifyAuth } from "../../../interface-adapters/middlewares/authentication.middleware";
import { BaseRoute } from "../baseRoute";
import { getVendorDetailsController, refreshTokenController, requestVerificationController } from "../../di/resolver";

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
        );
        this.router.post('/vendor/refresh-token',
            decodeToken,
            (req:Request,res:Response)=>{
                refreshTokenController.handle(req,res)
            }
        )
        this.router.get('/vendor',
            verifyAuth,
            authorizeRole(['vendor']),
            (req:Request,res:Response)=>{
                getVendorDetailsController.handle(req,res)
            }
        )
    }
}