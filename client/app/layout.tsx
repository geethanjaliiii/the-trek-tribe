'use client'
import type React from "react"
import { Toaster } from "sonner"
import "./globals.css"
//import { wrapper } from "@/lib/store"
import { Provider } from "react-redux"
import { store } from "@/lib/store"



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
        {children}
        <Toaster position="top-center" />
        </Provider>
        
      </body>
    </html>
  )
}

// export const getServerSideProps =wrapper.getServerSideProps((store)=>
// async()=> {
//   return {props: {}}
// })