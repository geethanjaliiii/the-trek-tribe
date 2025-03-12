import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import express,{Application,Request,Response,NextFunction } from 'express'
import "reflect-metadata"
import { errorHandler } from "../../interface-adapters/middlewares/error-handler.middleware";
import { AuthRoutes } from "../routes/auth/auth.route";
import { PrivateRoutes } from "../routes/common/private.route";
import { notFound } from "../../interface-adapters/middlewares/not-found.middleware";

dotenv.config()
export class Server {
    private _app: Application;

    constructor() {
        this._app = express();
        this.configureMiddlewares();
        this.configureRoutes();
        this.configureErrorHandling();
    }

    private configureMiddlewares(): void {
        this._app.use(helmet())//helmet for enhanced security -prevent XSS
        this._app.use(cors({origin:process.env.CORS_ORIGIN, credentials:true}));
        this._app.use(express.json());
        this._app.use(cookieParser());
        this._app.use(rateLimit({windowMs:15*60*1000, max:1000}))
    }

    private configureRoutes(): void {
        this._app.get('/',(req:Request,res:Response)=>{
            res.send("Trek tribe running...")
        })
        this._app.use('/api/v_1/auth', new AuthRoutes().router);
        this._app.use('/api/v_1/_pvt',new PrivateRoutes().router);
        
        this._app.use('*',notFound);
    }

    private configureErrorHandling(): void {
        this._app.use((err:Error,req:Request,res:Response,next:NextFunction)=> {
            errorHandler(err,req,res,next);
        });
    }

    public getApp(): Application {
        return this._app
    }
}