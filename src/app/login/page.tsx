import LoginForm from '../../components/forms/LoginForm';
import Logo from '../../components/Logo';
export default function Signup() {
  return (
      <div >
        <Logo />
        <div className="min-h-screen flex justify-center pt-2 p">
          <LoginForm />
        </div>
    </div>
  );
}
