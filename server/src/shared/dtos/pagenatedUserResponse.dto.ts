import { IClient } from "../../domain/entities/client.entity";
import { IVendor } from "../../domain/entities/vendor.entity";

export interface PaginatedUsersDTO {
  user: IClient[] | IVendor[] | [];
  total: number;
}