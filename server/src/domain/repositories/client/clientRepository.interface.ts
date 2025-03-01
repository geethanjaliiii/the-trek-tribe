import { injectable } from "tsyringe";
import { IClient } from "../../entities/client.entity";

export interface IClientRepository {
  save(data: Partial<IClient>): Promise<IClient>;

  find(
    filter: unknown,
    skip: number,
    limit: number
  ): Promise<{ user: IClient[] | []; total: number }>;
  
  findById(id: string): Promise<IClient | null>;
  
  findByEmail(email: string): Promise<IClient | null>;
  
  findByIdAndUpdatePassword(id: string, password: string): Promise<void>;
  
  updateClientProfileById(
    id: string,
    data: Partial<IClient>
  ): Promise<void>;
}
