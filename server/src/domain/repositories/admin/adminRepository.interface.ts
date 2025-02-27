import { IAdmin } from "../../entities/admin.entity";

export interface IAdminRepository {
    save(data: Partial<IAdmin>): Promise<IAdmin>;
    findByEmail(email: string): Promise<IAdmin | null>
}