import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInvoicesStart,
  fetchInvoicesSuccess,
} from "../../redux/slices/invoicesSlices";
import { RootState } from "../../redux/store";

const hardcodedInvoices = [
  {
    id: 1,
    date: "2025-05-01",
    amount: 1000,
    status: "Paid",
    concept: "Account Payment",
  },
  {
    id: 2,
    date: "2025-05-10",
    amount: 500,
    status: "Partially Paid",
    concept: "Invoice",
  },
  {
    id: 3,
    date: "2025-05-15",
    amount: 1200,
    status: "Due",
    concept: "Account Payment",
  },
];

export default function BillingScreen() {
  const dispatch = useDispatch();
  const { invoices, loading } = useSelector(
    (state: RootState) => state.invoices
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [showDateFromPicker, setShowDateFromPicker] = useState(false);
  const [showDateToPicker, setShowDateToPicker] = useState(false);

  useEffect(() => {
    dispatch(fetchInvoicesStart());
    // Simular fetch con delay
    setTimeout(() => {
      dispatch(fetchInvoicesSuccess(hardcodedInvoices));
    }, 1000);
  }, [dispatch]);

  const filteredInvoices = invoices.filter(
    (inv: { status: string; concept: string }) => {
      if (
        statusFilter !== "All" &&
        inv.status.toLowerCase() !== statusFilter.toLowerCase()
      ) {
        return false;
      }
      if (
        search &&
        !inv.concept.toLowerCase().includes(search.toLowerCase()) &&
        !inv.status.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      return true;
    }
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Billing Overview</Text>

      <View style={styles.datePickerRow}>
        <TouchableOpacity onPress={() => setShowDateFromPicker(true)}>
          <Text>From: {dateFrom.toDateString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowDateToPicker(true)}>
          <Text>To: {dateTo.toDateString()}</Text>
        </TouchableOpacity>
      </View>

      {showDateFromPicker && (
        <DateTimePicker
          value={dateFrom}
          mode="date"
          display="default"
          onChange={(event: any, date?: Date) => {
            setShowDateFromPicker(false);
            if (date) setDateFrom(date);
          }}
        />
      )}
      {showDateToPicker && (
        <DateTimePicker
          value={dateTo}
          mode="date"
          display="default"
          onChange={(event: any, date?: Date) => {
            setShowDateToPicker(false);
            if (date) setDateTo(date);
          }}
        />
      )}

      <View style={styles.filterRow}>
        {["All", "Paid", "Partially Paid", "Due", "Overdue"].map((status) => (
          <TouchableOpacity
            key={status}
            onPress={() => setStatusFilter(status)}
            style={[
              styles.statusButton,
              statusFilter === status && styles.statusButtonActive,
            ]}
          >
            <Text
              style={{
                color: statusFilter === status ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Search"
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={filteredInvoices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.invoiceCard}>
              <Text>{item.date}</Text>
              <Text>{item.concept}</Text>
              <Text>{item.amount}</Text>
              <Text>{item.status}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  datePickerRow: { flexDirection: "row", justifyContent: "space-between" },
  filterRow: {
    flexDirection: "row",
    marginVertical: 12,
    justifyContent: "space-around",
  },
  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#999",
  },
  statusButtonActive: {
    backgroundColor: "#2ecc40",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  invoiceCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 6,
    borderRadius: 8,
  },
});
