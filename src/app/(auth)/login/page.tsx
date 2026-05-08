'use client'
import LoginForm from '../../../components/forms/LoginForm';
import Logo from '../../../components/Logo';
import { Suspense } from 'react';
export default function Signup() {

  return (
    <div>
      <Logo />
      <div className="min-h-screen flex justify-center pt-2 p">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm/>
        </Suspense>
      </div>
    </div>
  );
}
