import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface Movement {
  concept: string;
  date: string;
  amount: number;
  status: "paid" | "pending";
}

function BillingScreen() {
  const movements = useSelector((state: RootState) => state.billing.movements);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredMovements = movements.filter((movement: Movement) => {
    const matchesSearch = movement.concept
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || movement.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <ScrollView style={billingStyles.billingContainer}>
      <View style={billingStyles.dateFiltersContainer}>
        <Text style={billingStyles.dateFilterText}>FROM</Text>
        <View style={billingStyles.datePickerPlaceholder}>
          <Text>Apr 17, 2025</Text>
        </View>
        <Text style={billingStyles.dateFilterText}>TO</Text>
        <View style={billingStyles.datePickerPlaceholder}>
          <Text>May 17, 2025</Text>
        </View>
      </View>

      <Text style={billingStyles.sectionTitle}>BALANCE</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={billingStyles.summaryScrollContainer}
      >
        <View style={billingStyles.summaryContainer}>
          <View style={billingStyles.summaryCard}>
            <Text style={billingStyles.summaryTitle}>Total billing</Text>
            <Text style={billingStyles.summaryAmount}>$252,263,632.6</Text>
            <Text style={billingStyles.summaryInvoices}>11 invoices</Text>
          </View>
          <View style={[billingStyles.summaryCard, billingStyles.paidCard]}>
            <Text style={billingStyles.summaryTitle}>Paid</Text>
            <Text style={billingStyles.summaryAmount}>$0</Text>
            <Text style={billingStyles.summaryInvoices}>0 invoices</Text>
          </View>
          <View
            style={[billingStyles.summaryCard, billingStyles.partiallyPaidCard]}
          >
            <Text style={billingStyles.summaryTitle}>Partially paid</Text>
            <Text style={billingStyles.summaryAmount}>$41,280,732.83</Text>
            <Text style={billingStyles.summaryInvoices}>1 invoices</Text>
          </View>
          <View style={[billingStyles.summaryCard, billingStyles.dueCard]}>
            <Text style={billingStyles.summaryTitle}>Due</Text>
            <Text style={billingStyles.summaryAmount}>$4,796.22</Text>
            <Text style={billingStyles.summaryInvoices}>3 invoices</Text>
          </View>
          <View style={[billingStyles.summaryCard, billingStyles.overdueCard]}>
            <Text style={billingStyles.summaryTitle}>Overdue</Text>
            <Text style={billingStyles.summaryAmount}>$210,978,103.55</Text>
            <Text style={billingStyles.summaryInvoices}>7 invoices</Text>
          </View>
        </View>
      </ScrollView>

      <Text style={billingStyles.sectionTitle}>MOVEMENTS</Text>

      <View style={billingStyles.filtersContainer}>
        <View style={billingStyles.statusFilterContainer}>
          <Text style={billingStyles.filterLabel}>STATUS</Text>
          <TouchableOpacity
            style={[
              billingStyles.statusButton,
              statusFilter === "all" && billingStyles.activeStatusButton,
            ]}
            onPress={() => setStatusFilter("all")}
          >
            <Text
              style={[
                billingStyles.statusButtonText,
                statusFilter === "all" && billingStyles.activeStatusButtonText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              billingStyles.statusButton,
              statusFilter === "paid" && billingStyles.activeStatusButton,
            ]}
            onPress={() => setStatusFilter("paid")}
          >
            <Text
              style={[
                billingStyles.statusButtonText,
                statusFilter === "paid" && billingStyles.activeStatusButtonText,
              ]}
            >
              Paid
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              billingStyles.statusButton,
              statusFilter === "pending" && billingStyles.activeStatusButton,
            ]}
            onPress={() => setStatusFilter("pending")}
          >
            <Text
              style={[
                billingStyles.statusButtonText,
                statusFilter === "pending" &&
                  billingStyles.activeStatusButtonText,
              ]}
            >
              Pending
            </Text>
          </TouchableOpacity>
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
              Cattler Corp
            </Text>
            <Text style={[billingStyles.itemText, { flex: 1 }]}>543</Text>
            <Text style={[billingStyles.itemText, { flex: 1.5 }]}>
              ${movement.amount.toFixed(2)}
            </Text>
            <Text style={[billingStyles.itemText, { flex: 1.5 }]}>
              2025-05-22
            </Text>
            <Text style={[billingStyles.itemText, { flex: 1 }]}>
              {movement.status.toUpperCase()}
            </Text>
            <Text style={[billingStyles.itemText, { flex: 1 }]}>$0</Text>
            <Text style={[billingStyles.itemText, { flex: 1.5 }]}>
              ${movement.amount.toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

function AccountsScreen() {
  return (
    <View style={billingStyles.notAvailableContainer}>
      <Text style={billingStyles.notAvailableText}>
        Accounts section is not available yet
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  headerUnderline: {
    height: 3,
    width: 50,
    backgroundColor: "#2ecc40",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  activeTabButton: {
    backgroundColor: "#333",
    borderColor: "#333",
  },
  tabButtonText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  activeTabButtonText: {
    color: "#fff",
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#2ecc40",
    borderRadius: 5,
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  contentArea: {
    flex: 1,
  },
});

const billingStyles = StyleSheet.create({
  billingContainer: {
    flex: 1,
    padding: 16,
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
  movementConcept: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  movementStatus: {
    fontSize: 10,
    fontWeight: "bold",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 12,
    overflow: "hidden",
  },
  statusPaid: {
    backgroundColor: "#e6f4ea",
    color: "#1e7e34",
  },
  statusPending: {
    backgroundColor: "#fff3cd",
    color: "#856404",
  },
  movementDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 12,
    color: "#666",
  },
  movementDate: {
    fontSize: 12,
    color: "#666",
  },
  movementAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  notAvailableContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  notAvailableText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default function BillingAccountsScreen() {
  const [activeTab, setActiveTab] = useState("Billing");

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>BILLING & ACCOUNTS</Text>
        <View style={styles.headerUnderline} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Billing" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("Billing")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "Billing" && styles.activeTabButtonText,
            ]}
          >
            BILLING
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Accounts" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("Accounts")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "Accounts" && styles.activeTabButtonText,
            ]}
          >
            ACCOUNTS
          </Text>
        </TouchableOpacity>

        <Link href="/administration/billing-accounts/new-payment" asChild>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ ADD</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.contentArea}>
        {activeTab === "Billing" ? <BillingScreen /> : <AccountsScreen />}
      </View>
    </View>
  );
}
