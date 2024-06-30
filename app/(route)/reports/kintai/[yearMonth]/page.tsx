import { getKintai } from "@/service/KintaiService";
import KintaiClient from "./components/KintaiClient";
import { findTemplates } from "@/service/TemplateService";

export default async function Kintai({
  params,
}: {
  params: { yearMonth: string };
}) {
  const kintai = await getKintai(params.yearMonth);
  const templates = await findTemplates();

  return <KintaiClient kintai={kintai} templates={templates} />;
}
