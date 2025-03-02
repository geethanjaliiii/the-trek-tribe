import { Request, Response } from "express";
import { BaseRoute } from "../baseRoute";
import { sendEmailController, verifyOTPController } from "../../di/resolver";

export class AuthRoutes extends BaseRoute {
    constructor(){
        super();
    }
    protected initializeRoutes(): void {
       this.router.post('/send-otp', (req: Request, res: Response) => {
        sendEmailController.handle(req, res)  })

        this.router.post('/verify-otp',(req: Request, res:Response) => {
            verifyOTPController.handle(req,res)
        })
    }
    
}