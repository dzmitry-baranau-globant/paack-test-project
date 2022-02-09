import { getDelivery, IDelivery } from "./mockData";

export const deliveriesMock: IDelivery[] = [
  getDelivery({ id: "1", client: "Aliexpress" }),
  getDelivery({ id: "2", client: "Paack" }),
  getDelivery({ id: "3", client: "Paack" }),
];
