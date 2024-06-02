import { validationMessages } from "@/lib/validationMessages";
import { checkEmail } from "@/lib/zodValidators";
import { z } from "zod";

export const formSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email(validationMessages.email)
      .refine(checkEmail, validationMessages.exists),
    username: z.string().min(3, validationMessages.min(3)),
    password: z.string().min(8, validationMessages.min(8)),
    confirm_password: z.string().min(8, validationMessages.min(8)),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: validationMessages.invalidConfirmPassword,
        path: ["confirm_password"],
      });
    }
  });
