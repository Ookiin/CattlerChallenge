import { configureStore } from "@reduxjs/toolkit";
import billingReducer from "./billingSlice";

export const store = configureStore({
  reducer: {
    billing: billingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
