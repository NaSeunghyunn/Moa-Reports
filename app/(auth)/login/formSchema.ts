import { validationMessages } from "@/lib/validationMessages";
import { z } from "zod";

export const formSchema = z.object({
  email: z.string().trim().email(validationMessages.EMAIL),
  password: z.string().min(8, validationMessages.minLength(8)),
});

export type IStateErrors = z.inferFlattenedErrors<typeof formSchema> | null;
