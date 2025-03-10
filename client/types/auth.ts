export interface SignupFormValues{
    fullName: string;
    email:string;
    password:string;
    confirmPassword: string;
}

export interface LoginFormValues {
    email: string;
    password: string;
    role:'admin' | 'vendor' | 'client' |'super_admin';
}

export interface OTPFormValues {
    otp: string;
}

export interface ClientSignupValues {
    fullName?:string;
    email:string;
    password: string;
    role:'client'
}

export interface VendorSignupValues {
    fullName: string;
    email:string;
    phoneNumber:string;
    password:string
    role:'vendor'
}

export type RegisterMutaionValues =VendorSignupValues | ClientSignupValues
export interface OTPVerifyResponse {
    data:{
        message: string;
        success: boolean;
    }
  }
export interface User {
    _id: string;
    fullName: string;
    email: string;
    isVerified?:boolean;
    role: 'admin' | 'vendor' | 'client' |'super_admin';
}

export interface AuthResponse {
    data: any;
    message: string; 
    user: User;
}

export interface AuthState {
    userInfo: User | null;
    isAuthenticated: boolean;
    // loading: boolean;
    // error: string | null;
}
export interface SocialAuthProvider {
    name: "google"
    icon: string
}