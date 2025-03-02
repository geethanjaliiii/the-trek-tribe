export interface SignupFormValues{
    fullName: string
    email:string
    password:string
    confirmPassword:string
}

export interface LoginFormValues {
    email: string;
    password: string;
}

export interface OTPFormValues {
    otp: string;
}

export interface User {
    _id: string;
    fullName: string;
    email: string;
    role: 'admin' | 'vendor' | 'client';
}

export interface AuthResponse {
    user: User;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}
export interface SocialAuthProvider {
    name: "google"
    icon: string
}