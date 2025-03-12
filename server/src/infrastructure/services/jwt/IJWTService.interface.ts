import { JwtPayload } from "jsonwebtoken";

export interface IJWTService {
    generateAccessToken(user: {id: string, email: string; role: string}):string;
    generateRefreshToken(user: {id: string, email: string, role: string}): string;
    verifyAccessToken(token: string) :{id: string; email: string; role: string}
    verifyRefreshToken(token: string) :{id: string; email: string; role: string}
    decodeAccessToken(token: string):JwtPayload|null
    decodeRefreshToken(token:string):JwtPayload|null
}