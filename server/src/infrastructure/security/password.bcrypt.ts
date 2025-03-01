import { injectable } from "tsyringe";
import { IBcrypt } from "./interface/bcrypt.interface";
import bcrypt from 'bcrypt'

@injectable()
export class PasswordBcrypt implements IBcrypt {
   async hash(password: string): Promise<string> {
        return await bcrypt.hash(password,10);
    }
   async compare(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password,hashedPassword)
    }
    
}