import { inject, injectable } from "tsyringe";
import { IClientRepository } from "../../../domain/repositories/client/clientRepository.interface";
import { IResetPasswordStrategy } from "../../interface/auth/IResetPasswordStrategy.interface";
import { CustomError } from "../../../shared/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/utils/constants";
import { ObjectId } from "mongoose";

@injectable()
export class ClientResetPasswordStrategy implements IResetPasswordStrategy {
  constructor(
    @inject("IClientRepository") private clientRepo: IClientRepository
    
  ) {}
 async reset(email: string, newPassword:string): Promise<void> {
   const user= await this.clientRepo.findByEmail(email);
   if(!user){
    throw new CustomError(ERROR_MESSAGES.EMAIL_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
   }
   await this.clientRepo.findByIdAndUpdatePassword(user?._id as ObjectId,newPassword)
  }

}
