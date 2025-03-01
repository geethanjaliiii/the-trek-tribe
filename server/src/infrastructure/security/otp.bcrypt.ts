import { injectable } from "tsyringe";
import { IBcrypt } from "./interface/bcrypt.interface";
import bcrypt from 'bcrypt'
@injectable()
export class OTPBcrypt implements IBcrypt {
   async hash(current: string): Promise<string> {
        return await bcrypt.hash(current,10)
    }
    async compare(current: string, original: string): Promise<boolean> {
        return await bcrypt.compare(current,original)
    }
 
}