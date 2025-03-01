import { inject, injectable } from "tsyringe";
import { IAdminRepository } from "../../../domain/repositories/admin/adminRepository.interface";
import { IRegisterStrategy } from "../../interface/auth/IRegisterStrategy.interface";
import { IBaseUser } from "../../../domain/entities/baseUser.entity";
import { AdminDTO, UserDTO } from "../../../shared/dtos/user.dto";
import { IBcrypt } from "../../../infrastructure/security/interface/bcrypt.interface";
import { CustomError } from "../../../shared/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS, UserRoles } from "../../../shared/utils/constants";

@injectable()
export class AdminRegisterStrategy implements IRegisterStrategy{
    constructor(
        @inject("IAdminPepository") private adminRepository: IAdminRepository,
        @inject("IPasswordBcrypt") private PasswordBcrypt :IBcrypt
    ){}
    async register(user: UserDTO): Promise< void> {
       if(user.role != 'admin'){
        throw new CustomError( "Invalid role for admin registration",
            HTTP_STATUS.BAD_REQUEST)
       }
       const existingAdmin = await this.adminRepository.findByEmail(user.email);
        if(existingAdmin){
            throw new CustomError(ERROR_MESSAGES.EMAIL_EXISTS, HTTP_STATUS.CONFLICT)
        }

        const {email, password} =user as AdminDTO;
        const hashedPassword= await this.PasswordBcrypt.hash(password);

        await this.adminRepository.save({
            email,
            password: hashedPassword,
            role:UserRoles.ADMIN
        })
    }
}
  