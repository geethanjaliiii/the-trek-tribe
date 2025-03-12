export interface IResetPasswordStrategy {
    reset(email:string, newPassword:string): Promise< void>
}