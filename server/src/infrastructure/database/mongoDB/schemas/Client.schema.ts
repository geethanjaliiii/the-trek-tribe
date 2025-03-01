import { Schema } from "mongoose";
import { IClientModel } from "../../models/client.model";
import { UserRoles } from "../../../../shared/utils/constants";

export const ClientSchema =new Schema<IClientModel>(
    {
        clientId: {type: String, required: true},
        fullName: {type: String},
        email: { type: String, required: true, unique: true },
        password: { type: String },
        role: {type: String, default: UserRoles.CLIENT, required: true},
        profileImage: {type: String},
        phoneNumber: {type: String},
        isActive:{type: Boolean, default: false}
    },
    { timestamps: true }
) 