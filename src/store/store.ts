import { configureStore } from "@reduxjs/toolkit";
import deliveriesReducer from "./slices/deliveriesSlice";

const store = configureStore({
  reducer: {
    deliveries: deliveriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
