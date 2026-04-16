import { useForm, useWatch } from 'react-hook-form';
import Input from '../ui/Input';
import { PasswordValidation } from '../ui/PasswordValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '../lib/validation/sighupSchema';

export function ResetPasswordForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });
  const password =
    useWatch({
      control,
      name: 'password',
    }) || '';
  return (
    <div className=" flex flex-col items-center w-full max-w-[480px] gap-4 rounded-lg p-6 md:p-12 bg-[#ffff] ">
      {/* header section */}
      <p className=" text-headline-lg text-slate-900 font-semibold">
        Create a New Password
      </p>
      <p className="text-body-md text-slate-700 font-medium mt-2 text-center md:text-start">
        Create a new, strong password to secure your workstation access.
      </p>
      {/* form */}
      <form className="w-full pb-6 md:pb-8 ">
        <div className="flex flex-col gap-6">
          <Input
            label="NEW PASSWORD"
            placeholder="••••••••"
            desc=""
            type="password"
            id="password"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          <Input
            label="CONFIRM PASSWORD"
            placeholder="••••••••"
            desc=""
            type="password"
            id="confirmpassword"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
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
            type="submit"
            className="w-full h-12 rounded-sm bg-gradient-to-r from-primary to-primary-container text-white"
          >
            Update Password
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
  );
}
