import { validationMessages } from "@/lib/validationMessages";
import { z } from "zod";

export const formSchema = z.object({
  year: z.coerce.number({ message: validationMessages.NAN }),
  month: z.coerce
    .number({ message: validationMessages.NAN })
    .min(1, validationMessages.min(1))
    .max(12, validationMessages.max(12)),
});

export type IStateErrors = z.inferFlattenedErrors<typeof formSchema> | null;
