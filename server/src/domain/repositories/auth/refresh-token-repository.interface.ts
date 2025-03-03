import { ObjectId } from "mongoose";
import { TRole } from "../../../shared/utils/constants";

export interface IRefreshTokenRepository {
    save(data: {
        token: string;
        userType: TRole;
        user: ObjectId;
        expiresAt: number;
    }): Promise<void>;

    revokeRefreshtoken(token: string) : Promise<void>;
    
}