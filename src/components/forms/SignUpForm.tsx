'use client';
import Input from '../ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupFormData } from '../lib/validation/sighupSchema';
import { useForm, useWatch } from 'react-hook-form';
import { auth } from '../lib/api/auth';
import { useRouter } from 'next/navigation';
export default function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) });
  const password =
    useWatch({
      control,
      name: 'password',
    }) || '';
  const onSubmit = async (data: SignupFormData) => {
    const result = await auth('signup', {
      email: data.email,
      password: data.password,
      data: {
        name: data.name,
        job_title: data.jobTitle,
      },
    });
    if (result) {
      router.replace('/');
    }
  };
  const hasMinLength = password.length >= 8;
  const hasUpperLowerNumber = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return (
    // main
    <div className="flex flex-col items-center w-full max-w-[576px] rounded-lg p-6 md:p-12 bg-[#ffff] shadow-[0_24px_48px_rgba(4,27,60,0.06)]">
      {/* header section */}
      <div className="w-full pb-8 text-center">
        <p className=" text-headline-lg text-slate-900 font-semibold">
          Create your workspace
        </p>
        <p className="text-body-md text-slate-700 font-medium mt-2">
          Join the editorial approach to task management
        </p>
      </div>
      {/* Form section */}
      <form
        className="pb-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-6">
          <Input
            label="NAME"
            placeholder="Enter your full name"
            desc="3-50 characters,letters only"
            type="text"
            id="name"
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            label="EMAIL"
            placeholder="your name@company.com"
            desc=""
            type="email"
            id="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="JOB TITLE"
            placeholder="e.g. Project Manager"
            desc=""
            type="text"
            id="title"
            {...register('jobTitle')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="PASSWORD"
              placeholder="Minimum 8 characters"
              desc=""
              type="password"
              id="password"
              {...register('password')}
              error={errors.password?.message}
            />
            <Input
              label="CONFIRM PASSWORD"
              placeholder="Repeat your password"
              desc=""
              type="password"
              id="confirm-password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
          </div>
          {/* check box */}
          <div className=" flex flex-col rounded-md p-4 gap-2 bg-[#E8EDFF]">
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs
      ${hasMinLength ? 'bg-green-500' : 'border border-gray-400'}`}
              >
                {hasMinLength && '✓'}
              </div>
              <span className=" text-xs text-[#434654]">
                At least 8 characters
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs
      ${hasUpperLowerNumber ? 'bg-green-500' : 'border border-gray-400'}`}
              >
                {hasUpperLowerNumber && '✓'}
              </div>
              <span className=" text-xs text-[#434654]">
                One uppercase, lowercase, and digit
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs
      ${hasSpecialChar ? 'bg-green-500' : 'border border-gray-400'}`}
              >
                {hasSpecialChar && '✓'}
              </div>
              <span className=" text-xs text-[#434654]">
                One special character
              </span>
            </div>
          </div>
          {/* create account */}
          <button
            type="submit"
            className="w-full h-12 rounded-md bg-gradient-to-r from-primary to-primary-container text-white"
          >
            Create Account
          </button>
        </div>
      </form>

      {/* Footer section */}
      <div className="mt-6 text-center text-body-md">
        <span className=" text-slate-700">Already have an account? </span>
        <a
          className="font-bold text-primary"
          href="login"
        >
          Log in
        </a>
      </div>
    </div>
  );
}
