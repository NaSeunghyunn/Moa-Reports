import { getKintais } from "@/service/KintaiService";
import KintaiClient from "./components/KintaiClient";

export default async function Kintai({
  params,
}: {
  params: { yearMonth: string };
}) {
  const kintais = await getKintais(params.yearMonth);

  return <KintaiClient kintais={kintais} />;
}
