import { IBaseUser } from "../../../domain/entities/baseUser.entity";

export interface IGoogleUseCase {
     execute(
        credential: any,
        client_id: any,
        role: any
      ): Promise<Partial<IBaseUser>|void> 
}