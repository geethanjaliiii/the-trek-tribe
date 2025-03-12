import { inject, injectable } from "tsyringe";
import { IRefrshTokenUsecase } from "../interface/auth/IRefreshTokenUseCase";
import { IJWTService } from "../../infrastructure/services/jwt/IJWTService.interface";
import { CustomError } from "../../shared/utils/CustomError";
import { HTTP_STATUS } from "../../shared/utils/constants";
import { JwtPayload } from "jsonwebtoken";
@injectable()
export class RefreshTokenUsecase implements IRefrshTokenUsecase {
  constructor(@inject("IJWTService") private jwtService: IJWTService) {}
  execute(refreshToken: string): { role: string; accessToken: string } {
    const payload = this.jwtService.verifyRefreshToken(refreshToken);
    if (!payload) {
      throw new CustomError("Invalid refresh token", HTTP_STATUS.BAD_REQUEST);
    }
    return {
      role: (payload as JwtPayload).role,
      accessToken: this.jwtService.generateAccessToken({
        id: (payload as JwtPayload).id,
        email: (payload as JwtPayload).email,
        role: (payload as JwtPayload).role,
      }),
    };
  }
}
