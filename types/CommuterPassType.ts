export interface CommuterPassType {
  id: number;
  type: "USE" | "UNUSED";
  start: string;
  end: string;
  price: number;
  orderNumber: number;
}
