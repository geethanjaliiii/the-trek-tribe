import { inject } from "tsyringe";
import { IResetPasswordUsecase } from "../interface/auth/IResetPasswordUsecase.interface";
import { IResetPasswordStrategy } from "../interface/auth/IResetPasswordStrategy.interface";
import { ClientRegisterStrategy } from "./register-strategies/client-register.stategy";
import { CustomError } from "../../shared/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/utils/constants";

export class ResetPasswordUsecase implements IResetPasswordUsecase {
  private strategies!: Record<string, IResetPasswordStrategy>;
    constructor(
    @inject("ClientRegisterStrategy")
    private clientStrategy: IResetPasswordStrategy,
    @inject("VendorRegisterStrategy")
    private vendorStrategy: IResetPasswordStrategy
  ) {
    const strategies={
        client: this.clientStrategy,
        vendor: this.vendorStrategy
    }
  }
  async execute(email: string, newPassword: string, role:'client'|'vendor'): Promise<void> {
    const stategy = this.strategies[role]
    if(!stategy){
        throw new CustomError(ERROR_MESSAGES.FORBIDDEN,HTTP_STATUS.FORBIDDEN)
    }
    await stategy.reset(email,newPassword)
  }
}
