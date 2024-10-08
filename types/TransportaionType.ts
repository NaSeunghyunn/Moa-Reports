import { CommuterPassType } from "./CommuterPassType";

export interface TransportaionType {
  id?: number;
  date: Date;
  start: string;
  end: string;
  isTwoWayDirection: boolean;
  goal: string;
  vehicle: string;
  price: number;
}

export type TransportaionsOfDayType = TransportaionType[];

export type AllGoalType = "_" | "テレワーク" | "出勤" | "";
export type AllVehicleType = "_" | "電車" | "バス" | "電車、バス" | "";

export interface IFindTransportationCond {
  year: number;
  month: number;
  userId: number;
}

export interface TransportationsType {
  id?: number;
  transportaionsOfDayList: TransportaionsOfDayType[];
  commuterPasses: CommuterPassType[];
}
