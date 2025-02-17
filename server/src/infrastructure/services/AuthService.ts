import { IAuthService } from "../../application/interfaces/services/IAuthService";
import bcrypt from 'bcrypt'
import  Jwt  from "jsonwebtoken";
import { JWT_SECRET, SALT_ROUNDS } from "../../shared/constants/constants";
export class AuthService implements IAuthService {
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, SALT_ROUNDS);
    }
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password,hashedPassword)
    }
    async generateToken(payload: object): Promise<string> {
        return Jwt.sign(payload,JWT_SECRET,{expiresIn:'7d'})
    }
    async verifyToken(token: string): Promise<object | null> {
       try {
        return Jwt.verify(token,JWT_SECRET)
       } catch (error) {
        return null
       }
    }
}