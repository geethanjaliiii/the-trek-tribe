import { inject, injectable } from "tsyringe";
import { IBaseUser } from "../../../domain/entities/baseUser.entity";
import { LoginUserDTO } from "../../../shared/dtos/user.dto";
import { ILoginStrategy } from "../../interface/auth/ILoginStrategy.interface";
import { IClientRepository } from "../../../domain/repositories/client/clientRepository.interface";
import { IBcrypt } from "../../../infrastructure/services/security/interface/bcrypt.interface";
import { CustomError } from "../../../shared/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/utils/constants";
import { IClient } from "../../../domain/entities/client.entity";

@injectable()
export class ClientLoginStrategy implements ILoginStrategy {
  constructor(
    @inject("IClientRepository") private clientRepo: IClientRepository,
    @inject("IPasswordBcrypt") private passwordBcrypt: IBcrypt
  ) {}
  async login(user: LoginUserDTO): Promise<IClient | void> {
    const { email, password } = user;
    if (!email || !password) {
      throw new CustomError(
        ERROR_MESSAGES.MISSING_PARAMETERS,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const client = await this.clientRepo.findByEmail(email);
    if (!client) {
      throw new CustomError(
        ERROR_MESSAGES.EMAIL_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
    if(!client.isActive){
        throw new CustomError(ERROR_MESSAGES.FORBIDDEN,HTTP_STATUS.FORBIDDEN)
    }
    const isPasswordSame = await this.passwordBcrypt.compare(password,client.password);
    if(!isPasswordSame){
        throw new CustomError(ERROR_MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.BAD_REQUEST)
    }
    return client
  }
}
