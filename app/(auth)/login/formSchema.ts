import { validationMessages } from "@/lib/validationMessages";
import { z } from "zod";

export const formSchema = z.object({
  email: z.string().trim().email(validationMessages.EMAIL),
  password: z.string().min(8, validationMessages.min(8)),
});
