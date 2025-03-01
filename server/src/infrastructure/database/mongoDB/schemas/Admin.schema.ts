import { Schema } from "mongoose";
import { IAdminModel } from "../../models/admin.model";
import { UserRoles } from "../../../../shared/utils/constants";

export const AdminSchema = new Schema<IAdminModel>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: UserRoles.ADMIN },
    isActive:{type: Boolean, default: true}
  },
  { timestamps: true }
);
