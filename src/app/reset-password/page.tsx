'use client';
import Logo from '@/components/Logo';
import { ResetPasswordForm } from '../../components/forms/ResetPasswordForm';


export default function ResetPassword() {
  const hash =
    typeof window !== 'undefined' ? window.location.hash.substring(1) : '';
  const params = new URLSearchParams(hash);
const refreshToken = params.get('refresh_token') || '';
const accessToken = params.get('access_token') || '';
  const error = params.get('error');
  return (
    <div>
      {!accessToken || error ? (
        <div className="flex items-center justify-center min-h-screen text-error">
          <p className="text-center text-red-500 text-lg font-medium">
            Invalid or expired reset link.
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          <Logo />
          <div className="min-h-screen flex justify-center items-center  px-4 ">
            <ResetPasswordForm
              accessToken={accessToken}
              refreshToken={refreshToken}
            />
          </div>
        </div>
      )}
    </div>
  );
}
