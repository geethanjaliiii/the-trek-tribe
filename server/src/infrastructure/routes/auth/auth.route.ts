import { Request, Response } from "express";
import { BaseRoute } from "../baseRoute";
import {
  forgetPasswordController,
  googleController,
  loginUserController,
  refreshTokenController,
  regsiterUserController,
  resetPasswordController,
  sendEmailController,
  verifyOTPController,
} from "../../di/resolver";

export class AuthRoutes extends BaseRoute {
  constructor() {
    super();
  }
  protected initializeRoutes(): void {
    this.router.post("/send-otp", (req: Request, res: Response) => {
      sendEmailController.handle(req, res);
    });

    this.router.post("/verify-otp", (req: Request, res: Response) => {
      verifyOTPController.handle(req, res);
    });

    this.router.post("/register", (req: Request, res: Response) => {
      regsiterUserController.handle(req, res);
    });

    this.router.post("/login", (req: Request, res: Response) => {
      loginUserController.handle(req, res);
    });

    this.router.post('/refresh-token',(req:Request, res:Response)=>{
      refreshTokenController.handle(req,res)
    });
    this.router.post('/google-auth',(req:Request, res:Response)=>{
      googleController.handle(req,res)
    });
    this.router.post('/forget-password',(req:Request, res:Response)=>{
      forgetPasswordController.handle(req,res)
    });
    this.router.post('/reset-password',(req:Request, res:Response)=>{
      resetPasswordController.handle(req,res)
    });
  }
}
