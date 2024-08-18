import { findTransportations } from "@/service/TransportationService";
import TransportationClient from "./components/TransoirtationClient";

export default async function Transportations() {
  const transportations = await findTransportations();
  return <TransportationClient transportations={transportations} />;
}
