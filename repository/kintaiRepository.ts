import "server-only";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { YearMonthType, saveKintaiDetailDto } from "@/types/KintaiType";

export async function findKintais(yearMonth: string, userId: number) {
  const [year, month] = yearMonth.split("-");
  const searchYearMotn = `${year}${month.padStart(2, "0")}`;

  const findKintai = await db.kintai.findUnique({
    where: {
      yearMonth_userId: {
        yearMonth: searchYearMotn,
        userId,
      },
    },
    select: {
      id: true,
      userId: true,
      Kintais: {
        select: {
          id: true,
          day: true,
          startTime: true,
          endTime: true,
          breakTime: true,
          workType: true,
          remarks: true,
        },
      },
    },
  });

  return findKintai;
}

export type KintaiPrismaType = Prisma.PromiseReturnType<typeof findKintais>;
export type KintaiDetailsPrismaType =
  NonNullable<KintaiPrismaType>["Kintais"][number];

export async function insertKintai(
  { year, month }: YearMonthType,
  userId: number
) {
  return await db.kintai.create({
    data: {
      yearMonth: `${year}${String(month).padStart(2, "0")}`,
      userId,
    },
    select: {
      id: true,
    },
  });
}

export async function upsertKintaiDetail(saveCond: saveKintaiDetailDto) {
  if (saveCond.id) {
    return await updateKintaiDetail(saveCond);
  } else {
    return await insertKintaiDetail(saveCond);
  }
}

async function updateKintaiDetail(saveCond: saveKintaiDetailDto) {
  return await db.kintaiDetail.update({
    where: { id: saveCond.id },
    data: {
      startTime: saveCond.startTime,
      endTime: saveCond.endTime,
      breakTime: saveCond.breakTime,
      workType: saveCond.workType,
      remarks: saveCond.remarks,
    },
    select: {
      id: true,
    },
  });
}

async function insertKintaiDetail(saveCond: saveKintaiDetailDto) {
  return await db.kintaiDetail.create({
    data: {
      day: saveCond.day,
      startTime: saveCond.startTime,
      endTime: saveCond.endTime,
      breakTime: saveCond.breakTime,
      workType: saveCond.workType,
      remarks: saveCond.remarks,
      kintaiId: saveCond.kintaiId,
    },
    select: {
      id: true,
    },
  });
}
