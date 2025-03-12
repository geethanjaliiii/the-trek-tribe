// import { inject, injectable } from "tsyringe";
// import { IResetPasswordStrategy } from "../../interface/auth/IResetPasswordStrategy.interface";
// import { CustomError } from "../../../shared/utils/CustomError";
// import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/utils/constants";
// import { ObjectId } from "mongoose";
// import { IAdminRepository } from "../../../domain/repositories/admin/adminRepository.interface";

// @injectable()
// export class AdminResetPasswordStrategy implements IResetPasswordStrategy {
//   constructor(
//     @inject("IAdminRepository") private adminRepo: IAdminRepository
    
//   ) {}
//  async reset(email: string, newPassword:string): Promise<void> {
//    const user= await this.adminRepo.findByEmail(email);
//    if(!user){
//     throw new CustomError(ERROR_MESSAGES.EMAIL_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
//    }
//    await this.adminRepo.findByIdAndUpdatePassword(user?._id as ObjectId,newPassword)
//   }

// }