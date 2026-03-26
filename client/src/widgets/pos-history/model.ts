export interface IHistoryOrder {
  id: string;
  time: string;
  cashier: string;
  total: string;
  items: string;
  status: "paid" | "refunded" | "pending";
  method: "card" | "cash" | "qr";
}

export const historyMock: IHistoryOrder[] = [
  {
    id: "TX-842",
    time: "10:24",
    cashier: "Мария",
    total: "$34.20",
    items: "8 позиций",
    status: "paid",
    method: "card",
  },
  {
    id: "TX-843",
    time: "10:12",
    cashier: "Мария",
    total: "$11.76",
    items: "3 позиции",
    status: "paid",
    method: "cash",
  },
  {
    id: "TX-844",
    time: "09:58",
    cashier: "Игорь",
    total: "$21.04",
    items: "5 позиций",
    status: "refunded",
    method: "card",
  },
  {
    id: "TX-845",
    time: "09:45",
    cashier: "Игорь",
    total: "$8.90",
    items: "2 позиции",
    status: "pending",
    method: "qr",
  },
];
