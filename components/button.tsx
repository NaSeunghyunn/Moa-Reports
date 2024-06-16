"use client";

import { useFormStatus } from "react-dom";

interface FormBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export default function FormBtn({ value, ...rest }: FormBtnProps) {
  const { pending } = useFormStatus();
  return (
    <button
      {...rest}
      disabled={pending}
      className="btn bg-green-500 border-green-500 hover:bg-green-300 transition-colors disabled:bg-gray-500"
    >
      {pending ? (
        <span className="loading loading-dots loading-md text-white"></span>
      ) : (
        <span className="text-black font-semibold text-base ">{value}</span>
      )}
    </button>
  );
}
