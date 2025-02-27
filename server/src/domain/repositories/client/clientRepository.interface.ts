import { IClient } from "../../entities/client.entity";

export interface IClientInterface {
  save(data: Partial<IClient>): Promise<IClient>;
  
  find(
    filter: unknown,
    skip: number,
    limit: number
  ): Promise<{ user: IClient[] | []; total: number }>;
  findById(id: string): Promise<IClient | null>;
  
}
// Authentication-related operations
export interface IClientAuthRepository {
    findByEmail(email: string): Promise<IClient | null>;
    findByIdAndUpdatePassword(id: string, password: string): Promise<void>;
}

//profile management
export interface IClientProfileRepository {
    updateClientProfileById(
        id: string,
        data: Partial<IClient>
      ): Promise<IClient | null>;
}

// Status management
export interface IClientStatusRepository {
    findByIdAndUpdateStatus(id: string, status: string): Promise<void>;
}