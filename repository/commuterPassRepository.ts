import "server-only";
import db from "@/lib/db";
import { CommuterPassEntity } from "@/types/CommuterPassType";

export async function selectByUserId(userId: number) {
  return await db.commuterPass.findMany({
    select: {
      id: true,
      type: true,
      startDay: true,
      start: true,
      end: true,
      price: true,
      orderNumber: true,
    },
    where: { userId },
    orderBy: [
      {
        startDay: "asc",
      },
      {
        orderNumber: "asc",
      },
    ],
  });
}

export async function bulkInsert(CommuterPasses: CommuterPassEntity[]) {
  await db.commuterPass.createMany({ data: CommuterPasses });
}

export async function deleteByUserId(userId: number) {
  await db.commuterPass.deleteMany({
    where: { userId },
  });
}

export async function bulkInsertAndDelete(
  commuterPasses: CommuterPassEntity[],
  userId: number
) {
  await deleteByUserId(userId);
  await bulkInsert(commuterPasses);
}
