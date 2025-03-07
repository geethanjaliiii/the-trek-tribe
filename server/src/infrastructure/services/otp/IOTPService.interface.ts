import { UserDTO } from "../../../shared/dtos/user.dto";

export interface IOTPService {
    generateOTP(email: string) :Promise<string | void>;
    verifyOTP(email: string, otp: string): Promise<boolean | void>;

}