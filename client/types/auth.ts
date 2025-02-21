export interface SignupFormValues{
    fullName: string
    email:string
    password:string
    confirmPassword:string
}

export interface SocialAuthProvider {
    name: "google"
    icon: string
}