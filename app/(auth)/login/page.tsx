import LoginForm from "./components/loginForm";

export default function Login() {
  return (
    <div className="py-8 px-6 flex flex-col">
      <div className="pb-10">
        <h1 className="text-2xl font-semibold text-center">MOA REPORTS</h1>
      </div>
      <LoginForm />
    </div>
  );
}
