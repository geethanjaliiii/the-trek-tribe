import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../shared/utils/constants";
import { CustomError } from "../../shared/utils/CustomError";

export const errorHandler =(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR
    let message = "Something Went wrong"

    if( err instanceof CustomError){
        statusCode = err.statusCode;
        message = err.message;
    }

    return res.status(statusCode).json({success: false, message});
}