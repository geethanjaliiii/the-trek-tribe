import { Document, model, ObjectId } from "mongoose";
import { IClient } from "../../../domain/entities/client.entity";
import { ClientSchema } from "../mongoDB/schemas/Client.schema";

export interface IClientModel extends Omit<IClient, '_id'>, Document {
    _id:ObjectId;
}

export const ClientModel =model<IClientModel>('Client',ClientSchema)