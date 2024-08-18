import db from "@/lib/db";
import { IFindTransportationCond } from "@/types/TransportaionType";

export async function selectTransportations({
  year,
  month,
  userId,
}: IFindTransportationCond) {
  const transportation = await db.transportation.findUnique({
    select: {
      id: true,
      details: {
        select: {
          id: true,
          day: true,
          start: true,
          end: true,
          isTwoWayDirection: true,
          goal: true,
          vehicle: true,
          price: true,
        },
      },
    },
    where: {
      year_month_userId: {
        year,
        month,
        userId,
      },
    },
  });

  return transportation;
}
