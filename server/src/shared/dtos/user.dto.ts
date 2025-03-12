import { IAdmin } from "../../domain/entities/admin.entity";
import { IClient } from "../../domain/entities/client.entity";
import { IVendor } from "../../domain/entities/vendor.entity";
import { TRole, UserRoles } from "../utils/constants";

export interface AdminDTO {
    email: string;
    password: string;
    role: UserRoles.ADMIN | UserRoles.SUPER_ADMIN;
}

export interface ClientDTO {
    clientId?: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    profileImage?: string;
    role:UserRoles.CLIENT;
    password: string;
}

export interface VendorDTO {
    vendorId?: string;
    fullName?: string;
    businessName?: string;
    email: string;
    phoneNumber?: string;
    profileImage?: string;
    googleId?: string;
    password?: string;
    role: UserRoles.VENDOR
}
export type UserDTO = AdminDTO | ClientDTO | VendorDTO

export interface LoginUserDTO {
    email: string;
    password?: string;
    role: TRole;
}

export type IUser =IAdmin | IVendor | IClient