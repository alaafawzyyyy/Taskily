'use client';
import { useForm, useWatch } from 'react-hook-form';
import Input from '../ui/Input';
import { PasswordValidation } from '../ui/PasswordValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from '../lib/validation/sighupSchema';
import { useRouter } from 'next/navigation';
import { resetPassword } from '../lib/api/auth';
import { useEffect, useState } from 'react';
import { setCookie } from '../lib/cookies';

export function ResetPasswordForm({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (accessToken) {
      setCookie('access_token', accessToken);
    }
    if (refreshToken) {
      setCookie('refresh_token', refreshToken);
    }
  }, [accessToken, refreshToken]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const password =
    useWatch({
      control,
      name: 'password',
    }) || '';

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword(data.password);
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      {success ? (
        <div className="text-center text-green-600 font-medium">
          ✔ Your password has been updated successfully. You can now log in
        </div>
      ) : (
        <div className=" flex flex-col items-center w-full max-w-[480px] gap-4 rounded-lg p-6 md:p-12 bg-[#ffff] ">
          <p className=" text-headline-lg text-slate-900 font-semibold">
            Create a New Password
          </p>
          <p className="text-body-md text-slate-700 font-medium mt-2 text-center md:text-start">
            Create a new, strong password to secure your workstation access.
          </p>
          {/* form */}
          <form
            className="w-full pb-6 md:pb-8 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-6">
              <div className="relative w-full">
                <Input
                  label="NEW PASSWORD"
                  placeholder="••••••••"
                  desc=""
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...register('password')}
                  error={errors.password?.message}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-[38px] z-10 "
                >
                  {showPassword ? '👁' : '👁'}
                </button>
              </div>
              <Input
                label="CONFIRM PASSWORD"
                placeholder="••••••••"
                desc=""
                type="password"
                id="confirmPassword"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />
              <PasswordValidation
                password={password || ''}
                layout="grid"
                rules={[
                  {
                    label: '8-64 characters',
                    test: (p) => p.length >= 8 && p.length <= 64,
                  },
                  {
                    label: 'Uppercase letter',
                    test: (p) => /[A-Z]/.test(p),
                  },
                  {
                    label: 'Lowercase letter',
                    test: (p) => /[a-z]/.test(p),
                  },
                  {
                    label: 'One digit',
                    test: (p) => /\d/.test(p),
                  },
                  {
                    label: 'Special character',
                    test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p),
                  },
                ]}
                showTitle
              />
              {/* epdate password */}
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full h-12 rounded-sm bg-gradient-to-r from-primary to-primary-container text-white"
              >
                {isSubmitting ? 'Updating...' : 'Update Passsword'}{' '}
              </button>
              <a
                className="text-primary text-center text-[13px] font-medium"
                href="signup"
              >
                Back to sign in
              </a>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
