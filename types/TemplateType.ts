import { TEMPLATE_TYPE } from "@/lib/templateUtil";

export type TemplateType = (typeof TEMPLATE_TYPE)[keyof typeof TEMPLATE_TYPE];
