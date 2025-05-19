/* eslint-disable react-hooks/exhaustive-deps */
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { loadMovements } from "../../../../store/billingSlice";
import { AppDispatch, RootState } from "../../../../store/store";

export default function BillingScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "paid" | "partially_paid" | "due" | "overdue"
  >("all");

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [isFromPickerVisible, setFromPickerVisible] = useState(false);
  const [isToPickerVisible, setToPickerVisible] = useState(false);

  const movements = useSelector((state: RootState) => state.billing.movements);
  const dispatch = useDispatch<AppDispatch>();

  const summary = movements.reduce(
    (acc, m) => {
      const status = m.current_payment_status.toLowerCase();

      acc.totalBilling += m.total_amount_owner;
      acc.totalInvoices += 1;

      if (status === "paid") {
        acc.paidAmount += m.total_amount_owner;
        acc.paidCount += 1;
      } else if (status === "partial" || status === "partially_paid") {
        acc.partialAmount += m.paid;
        acc.partialCount += 1;
      } else if (status === "due") {
        acc.dueAmount += m.balance;
        acc.dueCount += 1;
      } else if (status === "overdue") {
        acc.overdueAmount += m.balance;
        acc.overdueCount += 1;
      }

      return acc;
    },
    {
      totalBilling: 0,
      totalInvoices: 0,
      paidAmount: 0,
      paidCount: 0,
      partialAmount: 0,
      partialCount: 0,
      dueAmount: 0,
      dueCount: 0,
      overdueAmount: 0,
      overdueCount: 0,
    }
  );

  useEffect(() => {
    dispatch(loadMovements());
  }, []);

  const showFromPicker = () => setFromPickerVisible(true);
  const hideFromPicker = () => setFromPickerVisible(false);
  const handleFromConfirm = (date: Date) => {
    setFromDate(date);
    hideFromPicker();
  };

  const showToPicker = () => setToPickerVisible(true);
  const hideToPicker = () => setToPickerVisible(false);
  const handleToConfirm = (date: Date) => {
    setToDate(date);
    hideToPicker();
  };

  const normalizeStatus = (status: string): string => {
    switch (status.toLowerCase()) {
      case "partial":
        return "partially_paid";
      default:
        return status.toLowerCase();
    }
  };

  const filteredMovements = movements.filter((movement) => {
    const matchesSearch = movement.bill_to.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const movementStatus = normalizeStatus(movement.current_payment_status);
    const matchesStatus =
      statusFilter === "all" || movementStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <ScrollView style={billingStyles.billingContainer}>
      <View style={billingStyles.dateFiltersContainer}>
        <Text style={billingStyles.dateFilterText}>FROM</Text>
        <TouchableOpacity
          style={billingStyles.datePickerPlaceholder}
          onPress={showFromPicker}
        >
          <Text>{format(fromDate, "MMM dd, yyyy")}</Text>
        </TouchableOpacity>

        <Text style={billingStyles.dateFilterText}>TO</Text>
        <TouchableOpacity
          style={billingStyles.datePickerPlaceholder}
          onPress={showToPicker}
        >
          <Text>{format(toDate, "MMM dd, yyyy")}</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isFromPickerVisible}
        mode="date"
        date={fromDate}
        onConfirm={handleFromConfirm}
        onCancel={hideFromPicker}
      />
      <DateTimePickerModal
        isVisible={isToPickerVisible}
        mode="date"
        date={toDate}
        onConfirm={handleToConfirm}
        onCancel={hideToPicker}
      />

      <Text style={billingStyles.sectionTitle}>BALANCE</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={billingStyles.summaryScrollContainer}
      >
        <View style={billingStyles.summaryContainer}>
          <View style={billingStyles.summaryCard}>
            <Text style={billingStyles.summaryTitle}>Total billing</Text>
            <Text style={billingStyles.summaryAmount}>
              ${summary.totalBilling.toFixed(2)}
            </Text>
            <Text style={billingStyles.summaryInvoices}>
              {summary.totalInvoices} invoices
            </Text>
          </View>
          <View style={[billingStyles.summaryCard, billingStyles.paidCard]}>
            <Text style={billingStyles.summaryTitle}>Paid</Text>
            <Text style={billingStyles.summaryAmount}>
              ${summary.paidAmount.toFixed(2)}
            </Text>
            <Text style={billingStyles.summaryInvoices}>
              {summary.paidCount} invoices
            </Text>
          </View>
          <View
            style={[billingStyles.summaryCard, billingStyles.partiallyPaidCard]}
          >
            <Text style={billingStyles.summaryTitle}>Partially paid</Text>
            <Text style={billingStyles.summaryAmount}>
              ${summary.partialAmount.toFixed(2)}
            </Text>
            <Text style={billingStyles.summaryInvoices}>
              {summary.partialCount} invoices
            </Text>
          </View>
          <View style={[billingStyles.summaryCard, billingStyles.dueCard]}>
            <Text style={billingStyles.summaryTitle}>Due</Text>
            <Text style={billingStyles.summaryAmount}>
              ${summary.dueAmount.toFixed(2)}
            </Text>
            <Text style={billingStyles.summaryInvoices}>
              {summary.dueCount} invoices
            </Text>
          </View>
          <View style={[billingStyles.summaryCard, billingStyles.overdueCard]}>
            <Text style={billingStyles.summaryTitle}>Overdue</Text>
            <Text style={billingStyles.summaryAmount}>
              ${summary.overdueAmount.toFixed(2)}
            </Text>
            <Text style={billingStyles.summaryInvoices}>
              {summary.overdueCount} invoices
            </Text>
          </View>
        </View>
      </ScrollView>

      <Text style={billingStyles.sectionTitle}>MOVEMENTS</Text>

      <View style={billingStyles.filtersContainer}>
        <View style={billingStyles.statusFilterContainer}>
          <Text style={billingStyles.filterLabel}>STATUS</Text>

          {["all", "paid", "partially_paid", "due", "overdue"].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                billingStyles.statusButton,
                statusFilter === status && billingStyles.activeStatusButton,
              ]}
              onPress={() => setStatusFilter(status as typeof statusFilter)}
            >
              <Text
                style={[
                  billingStyles.statusButtonText,
                  statusFilter === status &&
                    billingStyles.activeStatusButtonText,
                ]}
              >
                {status.replace("_", " ").toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={billingStyles.searchContainer}>
          <TextInput
            style={billingStyles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={billingStyles.searchIconPlaceholder}>
            <Text>🔎</Text>
          </View>
        </View>
      </View>

      <View style={billingStyles.listHeader}>
        <Text style={[billingStyles.headerText, { flex: 1.5 }]}>DATE</Text>
        <Text style={[billingStyles.headerText, { flex: 2 }]}>OWNER</Text>
        <Text style={[billingStyles.headerText, { flex: 1 }]}>BILL/INV</Text>
        <Text style={[billingStyles.headerText, { flex: 1.5 }]}>AMOUNT</Text>
        <Text style={[billingStyles.headerText, { flex: 1.5 }]}>DUE DATE</Text>
        <Text style={[billingStyles.headerText, { flex: 1 }]}>STATUS</Text>
        <Text style={[billingStyles.headerText, { flex: 1 }]}>PAID</Text>
        <Text style={[billingStyles.headerText, { flex: 1.5 }]}>BALANCE</Text>
      </View>

      <ScrollView
        style={billingStyles.movementsList}
        nestedScrollEnabled={true}
      >
        {filteredMovements.map((movement, index) => (
          <View key={index} style={billingStyles.movementItem}>
            <Text style={[billingStyles.itemText, { flex: 1.5 }]}>
              {movement.date}
            </Text>
            <Text style={[billingStyles.itemText, { flex: 2 }]}>
              {movement.bill_to.name}
            </Text>
            <Text style={[billingStyles.itemText, { flex: 1 }]}>
              {movement.number}
            </Text>
            <Text style={[billingStyles.itemText, { flex: 1.5 }]}>
              ${movement.total_amount_owner.toFixed(2)}
            </Text>
            <Text style={[billingStyles.itemText, { flex: 1.5 }]}>
              {movement.due_date}
            </Text>
            <Text style={[billingStyles.itemText, { flex: 1 }]}>
              {movement.current_payment_status.toUpperCase()}
            </Text>
            <Text style={[billingStyles.itemText, { flex: 1 }]}>
              ${movement.paid.toFixed(2)}
            </Text>
            <Text style={[billingStyles.itemText, { flex: 1.5 }]}>
              ${movement.balance.toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const billingStyles = StyleSheet.create({
  billingContainer: {
    flex: 1,
    padding: 16,
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
  },
  dateFiltersContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dateFilterText: {
    fontSize: 12,
    color: "#666",
    marginRight: 5,
  },
  datePickerPlaceholder: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
    padding: 8,
    marginRight: 15,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  summaryScrollContainer: {
    paddingRight: 10,
  },
  summaryContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  summaryCard: {
    width: 160,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paidCard: {
    backgroundColor: "#e6f4ea",
  },
  partiallyPaidCard: {
    backgroundColor: "#fff3cd",
  },
  dueCard: {
    backgroundColor: "#ffe9d9",
  },
  overdueCard: {
    backgroundColor: "#f8d7da",
  },
  summaryTitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  summaryInvoices: {
    fontSize: 10,
    color: "#666",
  },
  filtersContainer: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterLabel: {
    fontSize: 12,
    color: "#666",
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  statusFilters: {
    flexDirection: "row",
  },
  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  activeStatusButton: {
    backgroundColor: "#333",
    borderColor: "#333",
  },
  statusButtonText: {
    color: "#666",
    fontSize: 12,
  },
  activeStatusButtonText: {
    color: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 20,
  },
  searchIconPlaceholder: {
    padding: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginLeft: -1,
  },
  listHeader: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 4,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  movementsList: {
    flex: 1,
  },
  movementItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    marginBottom: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  itemText: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
});
