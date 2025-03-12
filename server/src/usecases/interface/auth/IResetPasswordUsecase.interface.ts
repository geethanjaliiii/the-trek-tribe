export interface IResetPasswordUsecase{
    execute(email:string, newPassword:string,role:'client'|'vendor'):Promise<void>
}