import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BillTo {
  id: number;
  name: string;
}

export interface Movement {
  id: number;
  number: number;
  total_amount_owner: number;
  due_date: string;
  bill_to: BillTo;
  current_payment_status: string;
  paid: number;
  balance: number;
  date: string;
}

interface BillingState {
  movements: Movement[];
  loading: boolean;
  error: string | null;
}

const initialState: BillingState = {
  movements: [],
  loading: false,
  error: null,
};

export const loadMovements = createAsyncThunk(
  "billing/loadMovements",
  async (_, { rejectWithValue }) => {
    try {
      const response = await import("../utils/getSimulationJson.json");
      return response.default as Movement[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const billingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    addPayment: (state, action: PayloadAction<Omit<Movement, "id">>) => {
      const newId =
        state.movements.length > 0
          ? Math.max(...state.movements.map((m) => m.id)) + 1
          : 1;

      const newMovement: Movement = {
        ...action.payload,
        id: newId,
        number: newId,
        current_payment_status: "paid",
        balance: 0,
      };

      state.movements.push(newMovement);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMovements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadMovements.fulfilled,
        (state, action: PayloadAction<Movement[]>) => {
          state.loading = false;
          if (state.movements.length === 0) {
            state.movements = action.payload;
          }
        }
      )
      .addCase(loadMovements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addPayment } = billingSlice.actions;
export default billingSlice.reducer;
