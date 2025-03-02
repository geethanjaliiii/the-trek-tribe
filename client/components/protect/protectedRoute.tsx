'use client'
import { RootState } from '@/lib/store';
import { UserRoles } from '@/shared/constants';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

function protectedRoute({children, allowedRoles}:ProtectedRouteProps) {
    const router =useRouter();
    const {isAuthenticated , user} = useSelector((state: RootState)=> state.auth);
    const [isLoading, setIsoading]= useState(false)

    useEffect(()=>{
        if(!isAuthenticated){
            router.push(`/${allowedRoles?.[0]===UserRoles.CLIENT?'':allowedRoles?.[0]} ||''/login`)
        } else if (allowedRoles && user?.role && !allowedRoles.includes(user.role)){
            router.push('/')
        }
    },[isAuthenticated, user, allowedRoles, router]);

    if(!isAuthenticated || (allowedRoles && user?.role && !allowedRoles.includes(user.role))){
        return null
    }
  return (
    <>
    {children}
    </>
      
  )
}

export default protectedRoute
