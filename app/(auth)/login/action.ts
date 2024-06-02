"use server";

import { formSchema } from "./formSchema";

export async function login(prevState: any, formData: FormData) {
  const input = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(input);
  if (!result.success) {
    return result.error.flatten();
  }
}
