import { injectable } from "tsyringe";
import { IJWTService } from "./IJWTService.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../../../shared/config/config";
import { HTTP_STATUS, UserRoles } from "../../../shared/utils/constants";
import { CustomError } from "../../../shared/utils/CustomError";

@injectable()
export class JWTService implements IJWTService {
    private accessSecret =config.jwt.ACCESS_SECRET;
    private  refreshSecret =config.jwt.REFRESH_SECRET;
    constructor() {
        if (!this.accessSecret || !this.refreshSecret) {
            throw new Error("JWT secrets are not defined! Check your environment variables.");
        }
    }
  generateAccessToken(user: { id: string; email: string; role: string; }): string {
    const expirationTime =(user?.role==UserRoles.ADMIN||UserRoles.SUPER_ADMIN)?config.jwt.ADMIN_ACCESS_EXPIRATION:config.jwt.ACCESS_EXPIRATION
       return jwt.sign({user}, this.accessSecret, {expiresIn: '15m'})
    }
     generateRefreshToken(user: { id: string; email: string; role: string; }): string {
        const expirationTime =(user?.role==UserRoles.ADMIN || UserRoles.SUPER_ADMIN )? config.jwt.ADMIN_REFRESH_EXPIRATION  : config.jwt.REFRESH_EXPIRATION;
        return jwt.sign({user},this.refreshSecret, {expiresIn: '7d'})
    }
     verifyAccessToken(token: string): { id: string; email: string; role: string; } {
        try {
            const decoded = jwt.verify(token, this.accessSecret) as { user: { id: string; email: string; role: string } };
            return decoded.user;
        } catch (error) {
            throw new CustomError("Invalid access token", HTTP_STATUS.UNAUTHORIZED);
        }
  
    }
     verifyRefreshToken(token: string): { id: string; email: string; role: string; } {
        try {
            const decoded = jwt.verify(token, this.refreshSecret) as { user: { id: string; email: string; role: string } };
            return decoded.user;
          } catch (error) {
            throw new CustomError("Invalid refresh token", HTTP_STATUS.UNAUTHORIZED);
          }
    }
    decodeAccessToken(token: string):JwtPayload | null{
        try {
            return jwt.decode(token) as JwtPayload
        } catch (error) {
            console.error("Access token verification failed:", error);
            return null;
        }
    }
    decodeRefreshToken(token: string):JwtPayload | null{
        try {
            return jwt.decode(token) as JwtPayload
        } catch (error) {
            console.error("Refresh token verification failed:", error);
            return null;
        }}
}