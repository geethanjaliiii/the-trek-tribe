export interface IVerifyOTPUseCase {
    excecute(email: string, otp: string): Promise<void>;
}