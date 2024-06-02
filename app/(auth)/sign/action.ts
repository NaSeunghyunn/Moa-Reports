"use server";

import { formSchema } from "./formSchema";

export async function saveAccount(prevState: any, formData: FormData) {
  const input = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = formSchema.safeParse(input);
  if (!result.success) {
    return result.error.flatten();
  }
}
