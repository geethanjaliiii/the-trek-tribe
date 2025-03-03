export interface ICheckUserExistanceService {
    emailExist(email: string): Promise<boolean>;
}