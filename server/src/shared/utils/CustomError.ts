export class CustomError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number ,isOperational = true){
        super(message);
        Object.setPrototypeOf(this,new.target.prototype);//js-built in error loses ots prototype chain when extended, so fixing it
        this.statusCode =statusCode;
        this.isOperational=isOperational;
        Error.captureStackTrace(this);//Removes CustomError from the stack trace.=>keeps logs clean

    }
}