import { Request, Response } from "express";
import {
  authorizeRole,
  decodeToken,
  verifyAuth,
} from "../../../interface-adapters/middlewares/authentication.middleware";
import {
  changeUserStatusController,
  getAllUsersController,
  refreshTokenController,
} from "../../di/resolver";
import { BaseRoute } from "../baseRoute";

export class AdminRoutes extends BaseRoute {
  constructor() {
    super();
  }
  protected initializeRoutes(): void {
    this.router.get(
      `/admin/users`,
      verifyAuth,
      authorizeRole(["admin", "super_admin"]),
      (req: Request, res: Response) => {
        getAllUsersController.handle(req, res);
      }
    );
    this.router.post(
      "/admin/refresh-token",
      decodeToken,
      (req: Request, res: Response) => {
        refreshTokenController.handle(req, res);
      }
    );
    this.router.patch(
      "/admin/users/status",
      verifyAuth,
      authorizeRole(["admin", "super_admin"]),
      (req: Request, res: Response) => {
        changeUserStatusController.handle(req, res);
      }
    );
  }
}
