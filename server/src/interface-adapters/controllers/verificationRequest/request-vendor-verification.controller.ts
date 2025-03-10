import { inject } from "tsyringe";
import { IRequestVerificationUsecase } from "../../../usecases/interface/vendor/IVerify-vendor-Usecase.interface";

export class RequestVendorVerification {
    constructor(@inject("IRequestVerification") private RequestVerificationUsecase:IRequestVerificationUsecase){

    } 
    async handle(req:Request, res:Response){

    }
}