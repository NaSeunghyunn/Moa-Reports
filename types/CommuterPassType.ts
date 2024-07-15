export interface CommuterPassType {
  id: string;
  commuterPassId?: number;
  type: "USE" | "UNUSED";
  startDay: number;
  start: string;
  end: string;
  price: number;
  orderNumber?: number;
}

export interface ItemGroups {
  [key: string]: CommuterPassType[];
}
