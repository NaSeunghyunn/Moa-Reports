"use client";

import FormBtn from "@/components/button";
import FormInput from "@/components/input";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/solid";
import { useFormState } from "react-dom";
import { login } from "../action";
import { IStateErrors } from "../formSchema";

export default function LoginForm() {
  const [state, action] = useFormState<IStateErrors>(login, null);

  return (
    <form action={action} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <FormInput
          Icon={EnvelopeIcon}
          type="email"
          name="email"
          required
          placeholder="Email"
          errors={state?.fieldErrors.email}
        />
        <FormInput
          Icon={KeyIcon}
          type="password"
          name="password"
          required
          placeholder="Password"
          errors={state?.fieldErrors.password}
        />
      </div>
      <FormBtn value="ログイン" />
    </form>
  );
}
