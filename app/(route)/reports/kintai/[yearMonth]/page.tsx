import { getKintai } from "@/service/KintaiService";
import KintaiClient from "./components/KintaiClient";

export default async function Kintai({
  params,
}: {
  params: { yearMonth: string };
}) {
  const kintai = await getKintai(params.yearMonth);

  return <KintaiClient kintai={kintai} />;
}
