import { UserDTO } from "../../../shared/dtos/user.dto";

export interface IOTPService {
    generateOTP(email: string) :Promise<string>;
    verifyOTP(email: string, otp: string): Promise<boolean>;
    storePendingUser(email: string, user: UserDTO): Promise<void>;
    getPendingUser(email: string): Promise<UserDTO | undefined>;
    clearPendingUser(email: string): Promise<void>;
}