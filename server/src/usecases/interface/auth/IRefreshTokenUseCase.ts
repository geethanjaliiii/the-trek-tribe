export interface IRefrshTokenUsecase {
    execute(refreshToken:string): {role:string; accessToken:string}
}