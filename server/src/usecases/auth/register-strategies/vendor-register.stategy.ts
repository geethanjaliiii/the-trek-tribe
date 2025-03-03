import { inject, injectable } from "tsyringe";
import { IRegisterStrategy } from "../../interface/auth/IRegisterStrategy.interface";
import { IVendorRepository } from "../../../domain/repositories/vendor/vendorRepository.interface";
import { IBaseUser } from "../../../domain/entities/baseUser.entity";
import { UserDTO, VendorDTO } from "../../../shared/dtos/user.dto";
import { IBcrypt } from "../../../infrastructure/services/security/interface/bcrypt.interface";
import { CustomError } from "../../../shared/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS, UserRoles } from "../../../shared/utils/constants";
import { VendorModel } from "../../../infrastructure/database/models/vendor.model";
import { generateRandomUUID } from "../../../infrastructure/services/security/randomId";
import { IVendor } from "../../../domain/entities/vendor.entity";

@injectable()
export class VendorRegisterStrategy implements IRegisterStrategy {
    constructor (
        @inject('IVendorRepository') private vendorRepository: IVendorRepository,
        @inject("IPasswordBcrypt") private passwordBcrypt: IBcrypt
    ){}
    async register(user: UserDTO): Promise<IVendor | void> {
       if(user.role != 'vendor'){
        throw new CustomError('Invalid role for vendor registration',HTTP_STATUS.BAD_REQUEST)
       }
       const normalizedUser=user.email.toLowerCase().trim();
       const existingVendor =await this.vendorRepository.findByEmail(normalizedUser);
       if(existingVendor){
        throw new CustomError(ERROR_MESSAGES.EMAIL_EXISTS, HTTP_STATUS.CONFLICT)
       }
       const {businessName, email, password} = user as VendorDTO
       const hashedPassword=password?await this.passwordBcrypt.hash(password):''
       const vendorId =generateRandomUUID();

       return await this.vendorRepository.save({
         businessName,
         email,
         password:hashedPassword,
         vendorId,
         role:UserRoles.VENDOR
        })
    }
}