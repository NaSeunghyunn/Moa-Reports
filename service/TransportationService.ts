"use server";

import { fetchHolidaysOfNumberYearMonth, getLastDay, isDayOff } from "@/lib";
import getSession from "@/lib/session";
import { selectTransportations } from "@/repository";
import {
  TransportaionsOfDayType,
  TransportationsType,
} from "@/types/TransportaionType";
import { findCommuterPasses } from "./CommuterPassService";
import { CommuterPassType } from "@/types/CommuterPassType";

export async function findTransportations(): Promise<TransportationsType> {
  const now = new Date();
  const userId = (await getSession()).id;

  if (!userId) throw new Error("invalid access");

  const commuterPassItemGroups = await findCommuterPasses();
  const commuterPasses = Object.keys(commuterPassItemGroups)
    .filter((key) => key !== "UNUSED")
    .flatMap((key) => commuterPassItemGroups[key]);
  const transportations = await selectTransportations({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    userId,
  });
  const holidays = await fetchHolidaysOfNumberYearMonth(
    now.getFullYear(),
    now.getMonth() + 1
  );

  const lastDay = getLastDay();
  const transportaionsOfDayList = Array.from(
    { length: lastDay },
    (_, index) => index + 1
  ).map((day): TransportaionsOfDayType => {
    const targetDate = new Date(now.getFullYear(), now.getMonth(), day);
    const transportationsOfDay = transportations?.details
      .filter((detail) => detail.day === day)
      .map((detail) => ({
        id: detail.id,
        date: targetDate,
        start: detail.start,
        end: detail.end,
        isTwoWayDirection: detail.isTwoWayDirection,
        goal: detail.goal,
        vehicle: detail.vehicle,
        price: detail.price,
      }));

    if (transportationsOfDay) return transportationsOfDay;

    return createDefaultTransportation(targetDate, commuterPasses, holidays);
  });

  return {
    id: transportations?.id,
    transportaionsOfDayList,
    commuterPasses,
  };
}

function createDefaultTransportation(
  date: Date,
  commuterPasses: CommuterPassType[],
  holidays: number[]
): TransportaionsOfDayType {
  if (isDayOff(date)) {
    return [
      {
        date,
        start: "",
        end: "",
        isTwoWayDirection: true,
        goal: "週末",
        vehicle: "",
        price: 0,
      },
    ];
  }
  if (holidays.includes(date.getDate())) {
    return [
      {
        date,
        start: "",
        end: "",
        isTwoWayDirection: true,
        goal: "祝日",
        vehicle: "",
        price: 0,
      },
    ];
  }
  const commuterPassKeys = Object.keys(commuterPasses);

  if (commuterPassKeys) {
    const targetCommuterPasses = commuterPasses.filter(
      (commuterPass) => commuterPass.orderNumber !== undefined
    );

    const minOrderNumberCommuterPass = targetCommuterPasses.reduce(
      (minItem, currentItem) => {
        return currentItem.orderNumber! < minItem.orderNumber!
          ? currentItem
          : minItem;
      },
      targetCommuterPasses[0]
    );

    const maxOrderNumberCommuterPass = targetCommuterPasses.reduce(
      (maxItem, currentItem) => {
        return currentItem.orderNumber! > maxItem.orderNumber!
          ? currentItem
          : maxItem;
      },
      targetCommuterPasses[0]
    );

    return [
      {
        date,
        start: minOrderNumberCommuterPass.start,
        end: maxOrderNumberCommuterPass.end,
        isTwoWayDirection: true,
        goal: "出勤",
        vehicle: "電車",
        price: 0,
      },
    ];
  }

  return [
    {
      date,
      start: "",
      end: "",
      isTwoWayDirection: true,
      goal: "テレワーク",
      vehicle: "",
      price: 0,
    },
  ];
}
