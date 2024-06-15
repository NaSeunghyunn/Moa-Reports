import { validationMessages } from "@/lib/validationMessages";
import { checkEmail } from "@/lib/zodValidators";
import { z } from "zod";

export const formSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email(validationMessages.EMAIL)
      .refine(checkEmail, validationMessages.EXISTS),
    username: z.string().min(2, validationMessages.min(2)),
    password: z.string().min(8, validationMessages.min(8)),
    confirm_password: z.string().min(8, validationMessages.min(8)),
  })
  .superRefine(async ({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: validationMessages.INVALID_CONFIRM_PASSWORD,
        path: ["confirm_password"],
      });
    }
  });

export type IStateErrors = z.inferFlattenedErrors<typeof formSchema> | null;
