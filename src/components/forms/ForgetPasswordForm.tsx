'use client';
import backarrow from '../../../public/assets/icons/backarrow.svg';
import check from '../../../public/assets/icons/check.svg';
import timer from '../../../public/assets/icons/timer.svg';
import reload from '../../../public/assets/icons/reload.svg';
import Image from 'next/image';
import Input from '../ui/Input';
import { useResendTimer } from '../../hooks/useResendTimer';
import { useState } from 'react';

export default function ForgetPasswordForm() {
  const { timeLeft, start, isRunning } = useResendTimer(1 * 20);
  const [hasStarted, setHasStarted] = useState(false);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className=" flex flex-col items-center w-full max-w-[480px] gap-4 rounded-lg p-6 md:p-12 bg-[#ffff] ">
      <Image
        src={reload}
        alt="forgot password reload"
        className="md:hidden"
      />
      {/* header section */}
      <div className="w-full pb-6 md:pb-8">
        <p className=" text-headline-lg text-slate-900 font-semibold">
          Forgot password?
        </p>
        <p className="text-body-md text-slate-700 font-medium mt-2">
          No worries, we&apos;ll send you reset instructions
        </p>
      </div>
      {/* Form section */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          start();
          setHasStarted(true);
        }}
        className="w-full pb-6 md:pb-8 "
      >
        <div className="flex flex-col gap-6">
          <Input
            label="EMAIL ADDRESS"
            placeholder="Enter your email"
            desc=""
            type="email"
            id="email"
          />

          {/* send reset link */}
          <button
            type="submit"
            onClick={start}
            className="w-full h-12 rounded-sm bg-gradient-to-r from-primary to-primary-container text-white"
          >
            Send Reset Link
          </button>
          <div className="text-center text-body-md flex justify-center gap-1">
            <Image
              src={backarrow}
              alt="back arrow"
            />
            <a
              className="font-bold text-primary"
              href="signup"
            >
              Back to log in
            </a>
          </div>
        </div>
      </form>
      {/* send again & timer */}
      <div className="flex flex-col border-t border-[#C3C6D6]/15 pt-6 md:pt-10 gap-4 md:gap-3 bg-[#82F9BE4D] md:bg-white">
        <div className="flex md:bg-[#82F9BE4D] gap-3  md:p-4 rounded-md">
          <Image
            src={check}
            alt="check mark"
          />
          <p className="text-green-800 leading-tight">
            If an account exists with this email, we&apos;ve sent a password
            reset link.
          </p>
        </div>
        {hasStarted && (
          <div className="flex flex-row md:flex-col gap-3 justify-around items-center ">
            <p className="text-label-sm text-[#00523599] md:text-[#434654] text-center">
              Didn&apos;t receive the email?
            </p>
            <button
              disabled={isRunning}
              className={`flex items-center justify-center gap-2 rounded h-[48px]  
                ${
                  isRunning
                    ? 'bg-[#F1F3FF] opacity-60'
                    : 'md:bg-primary text-white '
                }`}
            >
              <div className="flex items-center">
                <Image
                  src={timer}
                  alt="timer"
                  className="hidden md:block "
                />
              </div>
              <span
                className={`${isRunning ? ' md:text-[#737685]' : ' md:text-white md:px-2'} text-[#003D9B] flex items-center h-full md:text-[16px] md:font-semibold uppercase md:capitalize text-[11px] font-bold`}
              >
                {isRunning ? `Resend in ${minutes}:${seconds}` : 'Resend Email'}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
