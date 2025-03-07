import { injectable } from "tsyringe";
import { UserDTO } from "../../../shared/dtos/user.dto";
import { IOTPService } from "./IOTPService.interface";
import Redis from "ioredis";
import dotenv from "dotenv";
import {client} from '../../cache/redis.client'
import { CustomError } from "../../../shared/utils/CustomError";
import { HTTP_STATUS } from "../../../shared/utils/constants";
dotenv.config();

@injectable()
export class OTPService implements IOTPService {
  private redis=client;

  async generateOTP(email: string): Promise<string > {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const cooldownKey = `cooldown:${email}`;
    const cooldown = await this.redis.get(cooldownKey);
    if(cooldown){
   throw new CustomError("Please wait before requesting a new OTP",429)
    }
    await this.redis.set(`otp:${email}`, otp, {EX: 300}); //expires in 5 min
    await this.redis.set(cooldownKey, "active", { EX: 30 }); // 30-sec cooldown
    return otp;
  }

  async verifyOTP(email: string, otp: string): Promise<boolean> {
    const storedOTP = await this.redis.get(`otp:${email}`);
    if(!storedOTP || storedOTP!==otp) {//if TTL exceeded stored otp will be null
        return false;
    }
    await this.redis.del(`otp:${email}`)
    return true
  }

}
