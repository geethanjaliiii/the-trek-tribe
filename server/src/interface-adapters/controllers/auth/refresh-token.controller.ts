// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { CustomError } from "../../../shared/utils/CustomError";
// import { HTTP_STATUS, ERROR_MESSAGES } from "../../../shared/utils/constants";

// export class RefreshTokenController {
//   async handle(req: Request, res: Response): Promise<void> {
//     try {
//       const refreshToken = req.cookies.refreshToken;
//       if (!refreshToken) {
//         throw new CustomError("Refresh token required", HTTP_STATUS.UNAUTHORIZED);
//       }

//       // Verify refresh token
//       const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "your-refresh-secret") as { id: string; email: string };

//       // Generate new access token
//       const newAccessToken = jwt.sign(
//         { id: decoded.id, email: decoded.email },
//         process.env.JWT_SECRET || "your-access-secret",
//         { expiresIn: "15m" }
//       );

//       // Set new access token in cookie
//       res.setHeader(
//         "Set-Cookie",
//         cookie.serialize("accessToken", newAccessToken, {
//           httpOnly: true,
//           secure: process.env.NODE_ENV === "production",
//           sameSite: "strict",
//           maxAge: 15 * 60,
//           path: "/",
//         })
//       );

//       res.status(HTTP_STATUS.OK).json({ success: true, message: "Token refreshed" });
//     } catch (error) {
//       if (error instanceof jwt.TokenExpiredError) {
//         res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: "Refresh token expired" });
//         return;
//       }
//       if (error instanceof CustomError) {
//         res.status(error.statusCode).json({ success: false, message: error.message });
//         return;
//       }
//       res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: ERROR_MESSAGES.SERVER_ERROR });
//     }
//   }
// }