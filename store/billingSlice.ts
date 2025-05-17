import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movement {
  concept: string;
  date: string;
  amount: number;
  status: "paid" | "pending";
}

interface BillingState {
  movements: Movement[];
}

const initialState: BillingState = {
  movements: [
    {
      concept: "Account Payment",
      date: "2024-03-15",
      amount: 5000,
      status: "paid",
    },
    {
      concept: "Service Fee",
      date: "2024-03-14",
      amount: 3000,
      status: "pending",
    },
    {
      concept: "Monthly Subscription",
      date: "2024-03-13",
      amount: 2000,
      status: "paid",
    },
  ],
};

const billingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    addMovement: (state, action: PayloadAction<Movement>) => {
      state.movements.push(action.payload);
    },
    updateMovement: (
      state,
      action: PayloadAction<{ index: number; movement: Movement }>
    ) => {
      state.movements[action.payload.index] = action.payload.movement;
    },
    deleteMovement: (state, action: PayloadAction<number>) => {
      state.movements.splice(action.payload, 1);
    },
  },
});

export const { addMovement, updateMovement, deleteMovement } =
  billingSlice.actions;
export default billingSlice.reducer;
