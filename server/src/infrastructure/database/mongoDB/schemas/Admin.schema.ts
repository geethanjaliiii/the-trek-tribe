import { Schema } from "mongoose";
import { IAdminModel } from "../../models/admin.model";
import { UserRoles } from "../../../../shared/utils/constants";

export const AdminSchema = new Schema<IAdminModel>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [UserRoles.ADMIN, UserRoles.SUPER_ADMIN],
      default: UserRoles.ADMIN,
    },
    permissions: {
      canManageClients: { type: Boolean, default: true },
      canManageVendors: { type: Boolean, default: true },
      canModifyAdmins: { type: Boolean, default: false },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);
