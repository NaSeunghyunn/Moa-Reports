import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function selectTemplates(userId: number) {
  return db.userTemplate.findMany({
    where: {
      userId,
    },
    select: {
      tempalte: {
        select: {
          type: true,
          name: true,
        },
      },
    },
  });
}

export type tempalteListType = Prisma.PromiseReturnType<typeof selectTemplates>;
