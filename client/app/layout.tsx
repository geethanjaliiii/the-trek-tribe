'use client'
import type React from "react"
import { Toaster } from "sonner"
import "./globals.css"
//import { wrapper } from "@/lib/store"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { GoogleOAuthProvider } from '@react-oauth/google';
const GOOGLE_CLIENT_ID =process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID||''



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Provider store={store}>
        {children}
        <Toaster position="top-center" />
        </Provider>
        </GoogleOAuthProvider>
      </body>
    </html>
  )
}

// export const getServerSideProps =wrapper.getServerSideProps((store)=>
// async()=> {
//   return {props: {}}
// })