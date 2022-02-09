import { configureStore } from "@reduxjs/toolkit";
import deliveriesReducer from "./slices/deliveriesSlice";

export const createReduxStore = (preloadedState?: any) =>
  configureStore({
    reducer: {
      deliveries: deliveriesReducer,
    },
    preloadedState,
  });

const store = createReduxStore();

export type RootState = ReturnType<typeof store.getState>;

export default store;
