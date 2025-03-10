export type TRole ='super_admin'|'client' | 'admin' | "vendor"

export enum UserRoles {
    SUPER_ADMIN='super_admin',
    ADMIN = 'admin',
    VENDOR = 'vendor',
    CLIENT = 'client'
}

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  };
  
  export const SUCCESS_MESSAGES = {
    BOOKING_SUCCESS: "Booking completed.",
    CREATED: "Created successfully.",
    LOGIN_SUCCESS: "Login successful.",
    REGISTRATION_SUCCESS: "Registration completed successfully.",
    OTP_SEND_SUCCESS: "OTP sent successfully",
    LOGOUT_SUCCESS: "Logged out successfully.",
    UPDATE_SUCCESS: "Updated successfully.",
    DELETE_SUCCESS: "Deleted successfully.",
    OPERATION_SUCCESS: "Operation completed successfully.",
    PASSWORD_RESET_SUCCESS: "Password reset successfully.",
    VERIFICATION_SUCCESS: "Verification completed successfully.",
    DATA_RETRIEVED: "Data retrieved successfully.",
    ACTION_SUCCESS: "Action performed successfully.",
  };

  export const ERROR_MESSAGES = {
    WRONG_ID: "Wrong ID",
    AUTH_TOKEN_MISSING:'Token missing',
  TOKEN_EXPIRED: "Token Expired",
  EMAIL_NOT_FOUND: "Email Not Found",
  FORBIDDEN:
    "Access denied. You do not have permission to access this resource.",
  BLOCKED: "Your account has been blocked.",
  NOT_ALLOWED: "You are not allowed",
  EMAIL_EXISTS: "Email Already Exists",
  REQUEST_NOT_FOUND: "Request Not Found",
  INVALID_TOKEN: "Invalid token",
  INVALID_CREDENTIALS: "Invalid credentials provided.",
  USER_NOT_FOUND: "User not found.",
  UNAUTHORIZED_ACCESS: "Unauthorized access.",
  SERVER_ERROR: "An error occurred, please try again later.",
  VALIDATION_ERROR: "Validation error occurred.",
  MISSING_PARAMETERS: "Missing required parameters.",
  }

  export const EMAIL_SUBJECT='"Verify Your Trek Tribe Account"';

  export const MAX_VERIFICATION_APPLY_COUNT= 3