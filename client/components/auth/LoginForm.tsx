'use client';
import { RootState } from '@/lib/store';
import { TRoles } from '@/shared/constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { loginSuccess } from '@/features/auth/authSlice';
import { loginSchema } from '@/schemas/auth/loginSchema';
import { useFormik } from 'formik';
import axiosInstance from '@/lib/axios';
import { Eye, EyeIcon } from 'lucide-react';

interface LoginFormProps {
    role: TRoles
}
function LoginForm({role}:LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const {isAuthenticated} = useSelector((state: RootState)=> state.auth)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post('/auth/login', { ...values, role }, { withCredentials: true });
        dispatch(loginSuccess(response.data.user));
        toast.success(`Logged in as ${role} successfully!`);
        
        // Redirect based on role
        const redirectPath = role === 'client' ? '/treks' : role === 'vendor' ? '/vendor' : '/admin';
        router.push(redirectPath);
      } catch (error) {
        toast.error(`Login failed for ${role}. Check your credentials.`);
        console.error('Login error:', error);
      }
    },
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  if (isAuthenticated) {
    const redirectPath = role === 'client' ? '/' : role === 'vendor' ? '/vendor' : '/admin';
    router.push(redirectPath);
    return null;
  }
  return (
<div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-900">
          {role === 'client' ? '' : role === 'vendor' ? 'Vendor' : 'Admin'} Login
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...formik.getFieldProps('email')}
              className={`h-12 rounded-lg border px-4 ${
                formik.touched.email && formik.errors.email ? 'border-red-500' : ''
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...formik.getFieldProps('password')}
              className={`h-12 rounded-lg border px-4 ${
                formik.touched.password && formik.errors.password ? 'border-red-500' : ''
              }`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <EyeIcon className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
            </button>
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>
          <Button
            type="submit"
            className="h-12 w-full rounded-lg bg-[#2D6A4F] text-white hover:bg-[#1B4332]"
          >
            Log In
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link href="/signup" className="font-semibold text-[#2D6A4F] hover:text-[#1B4332]">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
