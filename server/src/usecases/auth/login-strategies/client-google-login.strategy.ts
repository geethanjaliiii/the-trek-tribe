import { inject, injectable } from "tsyringe";
import { IUser, LoginUserDTO } from "../../../shared/dtos/user.dto";
import { IBaseUser } from "../../../domain/entities/baseUser.entity";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/utils/constants";
import { CustomError } from "../../../shared/utils/CustomError";
import { IClientRepository } from "../../../domain/repositories/client/clientRepository.interface";
import { ILoginStrategy } from "../../interface/auth/ILoginStrategy.interface";

@injectable()
export class ClientGoogleLoginStrategy implements ILoginStrategy {
  constructor(
    @inject("IClientRepository") private clientRepository: IClientRepository
  ) {}
  async login(user: LoginUserDTO): Promise<void | Partial<IBaseUser> > {
    const client = await this.clientRepository.findByEmail(user.email);
    if (client) {
      if (client.status !== "active") {
        throw new CustomError(ERROR_MESSAGES.BLOCKED, HTTP_STATUS.FORBIDDEN);
      }
    }

    return client as Partial<IBaseUser>;
  }
}
