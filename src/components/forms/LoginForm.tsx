'use client';
import Input from '../ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginFormData } from '../lib/validation/LoginSchema';
import { useForm } from 'react-hook-form';
import { auth } from '../lib/api/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const [error, setError] = useState('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(LoginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await auth('login', {
        email: data.email,
        password: data.password,
      });
      router.replace('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className=" flex flex-col items-center w-full max-w-[480px] rounded-lg p-6 md:p-12 bg-[#ffff] shadow-[0_24px_48px_rgba(4,27,60,0.06)]">
      {/* header section */}
      <div className="w-full pb-8 text-center">
        <p className=" text-headline-lg text-slate-900 font-semibold">
          Welcome Back
        </p>
        <p className="text-body-md text-slate-700 font-medium mt-2">
          Please enter you details to access your workspace
        </p>
      </div>
      {/* Form section */}
      <form
        className=" w-full pb-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-6">
          <Input
            label="EMAIL"
            placeholder="yourname@company.com"
            desc=""
            type="email"
            id="email"
            {...register('email')}
            onChange={() => setError('')}
            error={errors.email?.message}
          />
          <Input
            label="PASSWORD"
            placeholder="Enter your password"
            desc=""
            type="password"
            id="password"
            {...register('password')}
            onChange={() => setError('')}
            error={errors.password?.message}
          />
          {/* remember & forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span className=" text-xs text-[#434654]">Remember Me</span>
            </label>
            <a
              href="forgot-password "
              className="text-xs text-primary cursor-pointer font-medium"
            >
              Forget Password?
            </a>
          </div>
          {/* create account */}
          <button
            type="submit"
            className="w-full h-12 rounded-sm bg-gradient-to-r from-primary to-primary-container text-white"
          >
            Log in
          </button>
          <p className="text-sm text-error text-center">{error}</p>
          {/* Footer section */}
          <div className="mt-6 text-center text-body-md">
            <span className=" text-slate-700">
              Don&apos;t have an account?{' '}
            </span>
            <a
              className="font-bold text-primary"
              href="signup"
            >
              Sign Up
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
