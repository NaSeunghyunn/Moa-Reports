import { findKintais } from "../repository/kintaiRepository";
import { KintaiDetailProps } from "../types/KintaiType";

export async function getKintais(
  yearMonth: string
): Promise<KintaiDetailProps[]> {
  const kintais = findKintais(yearMonth);
  return Promise.resolve(kintais);
}
