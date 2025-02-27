import { IUser } from "./baseUser.entity";

export interface IClient extends IUser {
    clientId: string
}