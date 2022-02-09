import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { IDelivery } from "../../utils/mockData";

const initialState: { deliveries: IDelivery[]; activeDeliveryId: string } = {
  deliveries: [],
  activeDeliveryId: "",
};

const { reducer: deliveriesReducer, actions } = createSlice({
  name: "deliveries",
  initialState,
  reducers: {
    setDeliveries: (
      state,
      action: PayloadAction<{ deliveries: IDelivery[] }>
    ) => {
      // @ts-ignore
      state.deliveries = action.payload.deliveries;
    },
    setActiveDelivery: (state, action: PayloadAction<{ id: string }>) => {
      state.activeDeliveryId = action.payload.id;
    },
    finishDelivery: (
      state,
      action: PayloadAction<{ index: number; status: string, position: any }>
    ) => {
      const { index, status, position } = action.payload;

      state.deliveries[index].status = {message: status, position: position};
      state.activeDeliveryId = "";
    },
  },
});

export const { setDeliveries, setActiveDelivery, finishDelivery } = actions;
export default deliveriesReducer;
