export interface IAuthService {
hashPassword(password: string):Promise<string>;
comparePassword(password:string,hashedPassword:string):Promise<boolean>;
generateToken(payload:object):Promise<string>
verifyToken(token:string):Promise<object|null>;
}