export interface IOTService {
    generateOTP(email: string) :Promise<string>;
    verifyOTP(email: string, otp: string): Promise<boolean>;
    
}