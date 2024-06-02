"use client";
import { useState } from "react";
import SignupFrom from "./components/signupForm";
import LoginForm from "../login/components/loginForm";
import { cls } from "@/lib/util";

export default function CreateAccount() {
  const [isLogin, setIsLogin] = useState(false);
  const onSignupClick = () => setIsLogin(false);
  const onLoginClick = () => setIsLogin(true);
  return (
    <div className="py-8 px-6 flex flex-col">
      <div className="pb-10">
        <h1 className="text-2xl">Welcome to MOA REPORTS!</h1>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-center text-center">
          <div className="grid grid-cols-2 border-b border-neutral-600 w-full">
            <button
              onClick={onSignupClick}
              className={cls(
                "pb-4 border-b-2 font-medium text-sm",
                !isLogin
                  ? "border-green-500 text-green-500"
                  : "border-gray-500 text-gray-500"
              )}
            >
              Sign up
            </button>
            <button
              onClick={onLoginClick}
              className={cls(
                "pb-4 border-b-2 font-medium text-sm",
                isLogin
                  ? "border-green-500 text-green-500"
                  : "border-gray-500 text-gray-500"
              )}
            >
              Login
            </button>
          </div>
        </div>

        <div>{isLogin ? <LoginForm /> : <SignupFrom />}</div>
      </div>
    </div>
  );
}
