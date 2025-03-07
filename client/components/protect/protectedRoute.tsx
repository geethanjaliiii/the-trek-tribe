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
    const {isAuthenticated , userInfo} = useSelector((state: RootState)=> state.auth);
    const [isLoading, setIsoading]= useState(false)

    useEffect(()=>{
        if(!isAuthenticated){
            router.push(`/${allowedRoles?.[0]===UserRoles.CLIENT?'':allowedRoles?.[0]} ||''/login`)
        } else if (allowedRoles && userInfo?.role && !allowedRoles.includes(userInfo.role)){
            router.push('/')
        }
    },[isAuthenticated, userInfo, allowedRoles, router]);

    if(!isAuthenticated || (allowedRoles && userInfo?.role && !allowedRoles.includes(userInfo.role))){
        return null
    }
  return (
    <>
    {children}
    </>
      
  )
}

export default protectedRoute
