'use client';
import Input from '../ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupFormData } from '../lib/validation/sighupSchema';
import { useForm } from 'react-hook-form';
import { signup } from '../lib/api/auth';

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: SignupFormData) => {
    const result = await signup({
      email: data.email,
      password: data.password,
      data: {
        name: data.name,
        job_title: data.jobTitle,
      },
    });
    console.log(result)
  };

  return (
    <div>
      <div>
        <p>create your workspace</p>
        <p>Join the editorial approach to task management</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div>
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
        <div>
          <p>• At least 8 characters</p>
          <p>• one uppercase,lowercase and digit</p>
          <p>• one special character</p>
        </div>
        <button type="submit">Create Account</button>
        <div>
          <p>
            Already have an account <a href="#"> Log in</a>
          </p>
        </div>
      </form>
    </div>
  );
}
