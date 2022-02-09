export interface IDelivery {
  id: string;
  client?: string;
  details?: string;
  status?: {
    message?: string;
    position?: {
      latitude?: string;
      longitude?: string;
    };
  };
}

export const getDelivery = ({
  id,
  client = "Aliexpress",
  status = {
    message: "",
    position: {},
  },
}: IDelivery) => ({
  id,
  details: "some details text",
  client,
  status,
});
