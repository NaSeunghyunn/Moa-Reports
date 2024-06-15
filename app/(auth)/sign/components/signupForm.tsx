"use client";

import FormInput from "@/components/input";
import {
  EnvelopeIcon,
  KeyIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useFormState } from "react-dom";
import { saveAccount } from "../action";
import FormBtn from "@/components/button";
import { IStateErrors } from "../formSchema";

export default function SignupFrom() {
  const [state, action] = useFormState<IStateErrors>(saveAccount, null);

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
          Icon={UserCircleIcon}
          type="text"
          name="username"
          required
          placeholder="Username"
          errors={state?.fieldErrors.username}
        />
        <FormInput
          Icon={KeyIcon}
          type="password"
          name="password"
          required
          placeholder="Password"
          errors={state?.fieldErrors.password}
        />
        <FormInput
          Icon={KeyIcon}
          type="password"
          name="confirm_password"
          required
          placeholder="Confirm Password"
          errors={state?.fieldErrors.confirm_password}
        />
      </div>
      <FormBtn value="会員登録" />
    </form>
  );
}
