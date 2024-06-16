"use server";

import { FormError } from "@/lib/exception/FormError";
import { formSchema } from "./formSchema";
import { redirect } from "next/navigation";
import { withErrorHandling } from "@/lib/exception/errorHandler";

export const kintaiList = withErrorHandling(kintaiListLogic);

async function kintaiListLogic(prevState: any, formData: FormData) {
  const form = validateForm(formData);
  redirect(`/reports/kintai/${form.data.year}-${form.data.month}`);
}

function validateForm(formData: FormData) {
  const form = {
    year: formData.get("year"),
    month: formData.get("month"),
  };
  const result = formSchema.safeParse(form);
  if (!result.success) {
    throw new FormError(result.error.flatten());
  }
  return result;
}
