import { inject, injectable } from "tsyringe";
import { IGenerateTokenUseCase } from "../interface/auth/IGenerateTokenUsecase.interface";
import { IJWTService } from "../../infrastructure/services/jwt/IJWTService.interface";
import { ITokenRepository } from "../../domain/repositories/redis/tokenRepository.interface";
import { JwtPayload } from "jsonwebtoken";
import { IRefreshTokenRepository } from "../../domain/repositories/auth/refresh-token-repository.interface";
import { TRole } from "../../shared/utils/constants";
import { ObjectId } from "mongoose";

@injectable()
export class GenerateTokenUseCase implements IGenerateTokenUseCase {
  constructor(
    @inject("IJWTService") private jwtService: IJWTService,
    @inject("IRefreshTokenRepository")
    private refreshTokenRepo: IRefreshTokenRepository
  ) {}
  async excecute(
    id: string,
    email: string,
    role: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokenPayload = { id, email, role };
    const accessToken = await this.jwtService.generateAccessToken(tokenPayload);
    const refreshToken = await this.jwtService.generateRefreshToken(
      tokenPayload
    );
    await this.refreshTokenRepo.save({
      token: refreshToken,
      userType: role as TRole,
      user: id as unknown as ObjectId,
      expiresAt: 98,
    });
    
    return { accessToken, refreshToken };
  }
}
