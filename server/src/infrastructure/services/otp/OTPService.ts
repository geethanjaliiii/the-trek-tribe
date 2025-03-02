import { injectable } from "tsyringe";
import { UserDTO } from "../../../shared/dtos/user.dto";
import { IOTPService } from "./IOTPService.interface";
import Redis from "ioredis";
import dotenv from "dotenv";
import {client} from '../../cache/redis.client'
dotenv.config();

@injectable()
export class OTPService implements IOTPService {
  private redis=client;

  async generateOTP(email: string): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.redis.setEx(`otp:${email}`, 600, otp); //30 min TTL
    return otp;
  }

  async verifyOTP(email: string, otp: string): Promise<boolean> {
    const storedOTP = await this.redis.get(`otp:${email}`);
    if(!storedOTP || storedOTP!==otp) {
        await this.redis.del(`otp:${email}`);
        await this.redis.del(`user:${email}`);
        return false;
    }
    return true
  }

  async storePendingUser(email: string, user: UserDTO): Promise<void> {
    await this.redis.setEx(`user:${email}`, 600, JSON.stringify(user));
  }

  async getPendingUser(email: string): Promise<UserDTO | undefined> {
   const userData = await this.redis.get(`user:${email}`);
   return userData?JSON.parse(userData): undefined
  }

  async clearPendingUser(email: string): Promise<void> {
    await this.redis.del(`otp:${email}`)
    await this.redis.del(`user:${email}`)
  }
}
