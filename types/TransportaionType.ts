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
