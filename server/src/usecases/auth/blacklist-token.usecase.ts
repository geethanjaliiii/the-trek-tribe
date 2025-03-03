import { inject, injectable } from "tsyringe";
import { ITokenRepository } from "../../domain/repositories/redis/tokenRepository.interface";
import { IJWTService } from "../../infrastructure/services/jwt/IJWTService.interface";
import { JwtPayload } from "jsonwebtoken";
import { IBlackListTokenUseCase } from "../interface/auth/IBlackListTokenUseCase.interface";

@injectable()
export class BlackListTokenUseCase implements IBlackListTokenUseCase {
    constructor(
      @inject("IRedisTokenRepository")
      private TokenRepository: ITokenRepository,
      @inject("IJwtService") private jwtService: IJWTService
    ) {}
    async execute(token: string): Promise<void> {
      const decoded: string | JwtPayload | null =
        this.jwtService.verifyAccessToken(token);
  
      if (!decoded || typeof decoded === "string" || !decoded.exp) {
        throw new Error("Invalid Token: Missing expiration time");
      }
  
      const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
      if (expiresIn > 0) {
        await this.TokenRepository.blackListToken(token, expiresIn);
      }
    }
  }