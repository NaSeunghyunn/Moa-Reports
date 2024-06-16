"use server";

import bcrypt from "bcrypt";
import { formSchema } from "./formSchema";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { FormError } from "@/lib/exception/FormError";
import { withErrorHandling } from "@/lib/exception/errorHandler";
import { insertUser } from "@/repository/userRepository";

export const saveAccount = withErrorHandling(saveAccountLogic);

async function saveAccountLogic(prevState: any, formData: FormData) {
  const form = await validateForm(formData);

  const hashedPassword = await bcrypt.hash(form.data.password, 12);
  const user = await insertUser(
    form.data.username,
    form.data.email,
    hashedPassword
  );

  const session = await getSession();
  session.id = user.id;
  await session.save();
  redirect("/home");
}

async function validateForm(formData: FormData) {
  const form = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = await formSchema.safeParseAsync(form);
  if (!result.success) {
    throw new FormError(result.error.flatten());
  }

  return result;
}
