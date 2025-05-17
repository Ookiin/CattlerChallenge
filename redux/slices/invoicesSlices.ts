import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Invoice {
  id: number;
  date: string;
  amount: number;
  status: string;
  concept: string;
}

interface InvoicesState {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
}

const initialState: InvoicesState = {
  invoices: [],
  loading: false,
  error: null,
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    fetchInvoicesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchInvoicesSuccess(
      state: { invoices: any; loading: boolean },
      action: PayloadAction<Invoice[]>
    ) {
      state.invoices = action.payload;
      state.loading = false;
    },
    fetchInvoicesFailure(
      state: { error: any; loading: boolean },
      action: PayloadAction<string>
    ) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchInvoicesStart,
  fetchInvoicesSuccess,
  fetchInvoicesFailure,
} = invoicesSlice.actions;

export default invoicesSlice.reducer;
