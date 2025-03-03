export interface IGenerateTokenUseCase {
    excecute(id: string, email: string, role: string): Promise< {accessToken: string, refreshToken: string}>
}