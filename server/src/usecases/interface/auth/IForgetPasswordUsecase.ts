export interface IForgetPasswordUsecase {
    execute(email:string):Promise<void>
}