export interface ISendEmailUseCase {
    //check existance
    //generate otp
    //sned email
    execute(email:string ): Promise<void>;
}