import { injectable } from "tsyringe";
import { IClient } from "../../../../domain/entities/client.entity";
import { IClientRepository } from "../../../../domain/repositories/client/clientRepository.interface";
import { ClientModel } from "../../models/client.model";

@injectable()
export class ClientRepository implements IClientRepository {
    async save(data: Partial<IClient>): Promise<IClient> {
        return await ClientModel.create(data);
    }
   async find(filter: object, skip: number, limit: number): Promise<{ user: IClient[] | []; total: number; }> {
      const [user, total]=await Promise.all([
        ClientModel.find(filter).sort({createdAt:-1}).skip(skip).limit(limit),
        ClientModel.countDocuments(filter)
      ]);
      return {user,total}
    }
    async findById(id: string): Promise<IClient | null> {
       return await ClientModel.findById(id);
    }
    async findByEmail(email: string): Promise<IClient | null> {
        return await ClientModel.findOne({email})
    }
    async findByIdAndUpdatePassword(id: string, password: string): Promise<void> {
        await ClientModel.findByIdAndUpdate(id,{password});
    }
    async updateClientProfileById(id: string, data: Partial<IClient>): Promise<void> {
        await ClientModel.findByIdAndUpdate(id,{$set: data})
    }

}