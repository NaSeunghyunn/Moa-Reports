"use server";

import bcrypt from "bcrypt";
import { FormError } from "@/lib/exception/FormError";
import { formSchema } from "./formSchema";
import { withErrorHandling } from "@/lib/exception/errorHandler";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { validationMessages } from "@/lib/validationMessages";
import { getUserCredentialsByEmail } from "@/repository/userRepository";

export const login = withErrorHandling(loginLogic);

async function loginLogic(prevState: any, formData: FormData) {
  const form = await validateForm(formData);

  const user = await getUserCredentialsByEmail(form.data.email);

  const invalidPassword = !(await bcrypt.compare(
    form.data.password,
    user?.password ?? ""
  ));
  if (invalidPassword) {
    return {
      fieldErrors: {
        password: [validationMessages.INVALID_LOGIN],
        email: [validationMessages.INVALID_LOGIN],
      },
    };
  }

  const session = await getSession();
  session.id = user?.id;
  await session.save();
  redirect("/reports/kintai");
}

async function validateForm(formData: FormData) {
  const form = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(form);
  if (!result.success) {
    throw new FormError(result.error.flatten());
  }
  return result;
}
