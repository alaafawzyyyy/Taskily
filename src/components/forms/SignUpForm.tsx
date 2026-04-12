'use client';
import Input from '../ui/Input';
import { useForm } from "react-hook-form";

export type FormData = {
  name: string;
  email: string;
  jobTitle: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit=(data: FormData)=> {
  }
  
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
        />
        <Input
          label="EMAIL"
          placeholder="your name@company.com"
          desc=""
          type="email"
          id="email"
          {...register('email')}
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
          />
          <Input
            label="CONFIRM PASSWORD"
            placeholder="Repeat your password"
            desc=""
            type="password"
            id="confirm-password"
            {...register('confirmPassword')}
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
