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

export default function JoinFrom() {
  const [state, action] = useFormState(saveAccount, null);

  return (
    <form action={action} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <FormInput
          Icon={EnvelopeIcon}
          type="email"
          name="email"
          placeholder="Email"
          errors={state?.errors}
        />
        <FormInput
          Icon={UserCircleIcon}
          type="text"
          name="username"
          placeholder="Username"
          errors={state?.errors}
        />
        <FormInput
          Icon={KeyIcon}
          type="password"
          name="password"
          placeholder="Password"
          errors={state?.errors}
        />
        <FormInput
          Icon={KeyIcon}
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          errors={state?.errors}
        />
      </div>
      <FormBtn value="会員登録" />
    </form>
  );
}
