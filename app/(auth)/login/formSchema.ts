import { validationMessages } from "@/lib/util/validationMessages";
import { z } from "zod";

export const formSchema = z.object({
  email: z.string().trim().email(validationMessages.email),
  password: z.string().min(8, validationMessages.min(8)),
});
