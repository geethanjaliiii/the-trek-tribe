export interface IChangeUserStatusUsecase {
    
    execute(userType:string,userId:any):Promise<void> 
    }
