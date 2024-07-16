import { findCommuterPasses } from "@/service/CommuterPassService";
import CommuterPassClient from "./commuterPassClient";

export default async function CommuterPass() {
  const commuterPassGroups = await findCommuterPasses();
  return <CommuterPassClient commuterPassGroups={commuterPassGroups} />;
}
