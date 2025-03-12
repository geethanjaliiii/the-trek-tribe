import { inject, injectable } from "tsyringe";
import { IBaseUser } from "../../domain/entities/baseUser.entity";
import { IGoogleUseCase } from "../interface/auth/IGoogleUsecase.interface";
import { IRegisterStrategy } from "../interface/auth/IRegisterStrategy.interface";
import { ILoginStrategy } from "../interface/auth/ILoginStrategy.interface";
import { OAuth2Client } from "google-auth-library";
import { HTTP_STATUS } from "../../shared/utils/constants";
import { CustomError } from "../../shared/utils/CustomError";

@injectable()
export class GoogleUsecase implements IGoogleUseCase {
  private registerStrategies: Record<string, IRegisterStrategy>;
  private loginStrategies: Record<string, ILoginStrategy>;
  private client: OAuth2Client;
  constructor(
    @inject("ClientRegisterStrategy") private clientRegister: IRegisterStrategy,
    @inject("VendorRegisterStrategy") private vendorRegister: IRegisterStrategy,
    @inject("ClientGoogleLoginStrategy") private clientLogin: ILoginStrategy,
    @inject("VendorGoogleLoginStrategy") private vendorLogin: ILoginStrategy
  ) {
    this.registerStrategies = {
        client: this.clientRegister,
        vendor: this.vendorRegister,
      };
      this.loginStrategies = {
        client: this.clientLogin,
        vendor: this.vendorLogin,
      };
      this.client = new OAuth2Client()
  }
  async execute(
    credential: any,
    client_id: any,
    role: any
  ): Promise<Partial<IBaseUser> | void> {
    const registerStrategy = this.registerStrategies[role];
    const loginStrategy = this.loginStrategies[role];
    if (!registerStrategy || !loginStrategy) {
      throw new CustomError("Invalid user role", HTTP_STATUS.FORBIDDEN);
    }
    const ticket = await this.client.verifyIdToken({
        idToken: credential,
        audience: client_id,
      });
      const payload = ticket.getPayload();
    if (!payload) {
      throw new CustomError(
        "Invalid or empty token payload",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const googleId = payload.sub;
    const email =payload.email;
    const fullName=`${payload.given_name} ${payload.family_name}`;
    const profileImage =payload.picture;

    if(!email){
        throw new CustomError("Email is required", HTTP_STATUS.BAD_REQUEST);
    }

    const existingUser = await loginStrategy.login({email,role})
    if(!existingUser){
    const newUser = await registerStrategy.register({
        fullName: fullName as string,
        role,
        googleId,
        email,
        profileImage
    })
    if (!newUser) {
        throw new CustomError("", 0);
      }

      return { email, role, _id: newUser._id };
    }

  
      return { email, role, _id: existingUser._id };
  }
 
}
