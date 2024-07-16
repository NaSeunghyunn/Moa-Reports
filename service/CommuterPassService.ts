"use server";

import getSession from "@/lib/session";
import { uuid } from "@/lib/uuid";
import {
  bulkInsertAndDelete,
  selectByUserId,
} from "@/repository/commuterPassRepository";
import {
  CommuterPassEntity,
  CommuterPassType,
  ItemGroups,
} from "@/types/CommuterPassType";
import { revalidatePath } from "next/cache";

export async function findCommuterPasses() {
  const { id } = await getSession();
  if (!id) throw new Error("セッションが正しくありません。");

  const dbData = await selectByUserId(id);
  return convertToItemGroups(dbData);
}

export async function saveCommuterPasses(itemGroups: ItemGroups) {
  const { id } = await getSession();
  if (!id) {
    throw new Error("セッションが正しくありません。");
  }

  let orderNumber = 0;

  const commuterPasses: CommuterPassEntity[] = Object.keys(itemGroups).flatMap(
    (group) => {
      const type: "USED" | "UNUSED" = group === "UNUSED" ? "UNUSED" : "USED";

      return itemGroups[group].map((item) => ({
        type,
        startDay: isNaN(+group) ? item.startDay : +group,
        start: item.start,
        end: item.end,
        price: item.price,
        orderNumber: ++orderNumber,
        userId: id,
      }));
    }
  );

  await bulkInsertAndDelete(commuterPasses, id);
  revalidatePath("/reports/commuterPass");
}

const convertToItemGroups = (
  dbData: {
    id: number;
    type: string;
    startDay: number;
    start: string;
    end: string;
    price: number;
    orderNumber: number;
  }[]
): ItemGroups => {
  const itemGroups: ItemGroups = {
    UNUSED: [],
  };

  dbData.forEach((item) => {
    const newItem: CommuterPassType = {
      id: uuid(),
      type: item.type === "UNUSED" ? "UNUSED" : "USE",
      commuterPassId: item.id,
      startDay: item.startDay,
      start: item.start,
      end: item.end,
      price: item.price,
      orderNumber: item.orderNumber,
    };

    if (item.type === "UNUSED") {
      itemGroups.UNUSED.push(newItem);
    } else {
      const key = newItem.startDay.toString();
      if (!itemGroups[key]) {
        itemGroups[key] = [];
      }
      itemGroups[key].push(newItem);
    }
  });

  return itemGroups;
};
