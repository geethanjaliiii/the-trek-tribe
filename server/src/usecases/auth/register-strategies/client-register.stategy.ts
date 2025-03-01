import { inject, injectable } from "tsyringe";
import { IRegisterStrategy } from "../../interface/auth/IRegisterStrategy.interface";
import { IClientRepository } from "../../../domain/repositories/client/clientRepository.interface";
import { IBcrypt } from "../../../infrastructure/security/interface/bcrypt.interface";
import { IBaseUser } from "../../../domain/entities/baseUser.entity";
import { IClient } from "../../../domain/entities/client.entity";
import { ClientDTO, UserDTO } from "../../../shared/dtos/user.dto";
import { CustomError } from "../../../shared/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS, UserRoles } from "../../../shared/utils/constants";
import { generateRandomUUID } from "../../../infrastructure/security/randomId";

@injectable()
export class ClientRegisterStrategy implements IRegisterStrategy {
    constructor(
        @inject('IClientRepository') private clientRepository: IClientRepository,
        @inject('IPasswordBcrypt') private passwordBcrypt: IBcrypt 
    ){}

    async register(user: UserDTO): Promise<IBaseUser | void>{
          if(user.role!='client'){
            throw new CustomError("Invalid role for client registration",HTTP_STATUS.BAD_REQUEST)
          }
          const normalizedEmail = user.email.toLowerCase().trim();
          const existingClient = await this.clientRepository.findByEmail(normalizedEmail);
          if(existingClient){
            throw new CustomError(ERROR_MESSAGES.EMAIL_EXISTS, HTTP_STATUS.CONFLICT);
          }
         
          
          //hash password
          const {fullName, email, password} =user as ClientDTO;
        
            const hashedPassword =password?await this.passwordBcrypt.hash(password):''
          
            const clientId = generateRandomUUID();
            return await this.clientRepository.save({
                fullName,
                email,
                password:hashedPassword,
                clientId,
                role:UserRoles.CLIENT
            })
    }
}