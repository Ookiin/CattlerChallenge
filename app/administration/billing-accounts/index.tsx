import { DrawerParamList } from "@/types/navigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AccountsScreen from "./components/AccountsScreen";
import BillingScreen from "./components/BillingScreen";

export default function BillingAccountsScreen() {
  const [activeTab, setActiveTab] = useState("Billing");
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();

  return (
    <View style={commonStyles.container}>
      <View style={pageHeaderStyles.headerContainer}>
        <Text style={pageHeaderStyles.headerText}>ADMINISTRATION</Text>
      </View>

      <View style={commonStyles.buttonContainer}>
        <TouchableOpacity
          style={[
            commonStyles.tabButton,
            activeTab === "Billing" && commonStyles.activeTabButton,
          ]}
          onPress={() => setActiveTab("Billing")}
        >
          <Text
            style={[
              commonStyles.tabButtonText,
              activeTab === "Billing" && commonStyles.activeTabButtonText,
            ]}
          >
            BILLING
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            commonStyles.tabButton,
            activeTab === "Accounts" && commonStyles.activeTabButton,
          ]}
          onPress={() => setActiveTab("Accounts")}
        >
          <Text
            style={[
              commonStyles.tabButtonText,
              activeTab === "Accounts" && commonStyles.activeTabButtonText,
            ]}
          >
            ACCOUNTS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={commonStyles.addButton}
          onPress={() => navigation.navigate("new-payment")}
        >
          <Text style={commonStyles.addButtonText}>+ ADD</Text>
        </TouchableOpacity>
      </View>

      <View style={commonStyles.contentArea}>
        {activeTab === "Billing" ? <BillingScreen /> : <AccountsScreen />}
      </View>
    </View>
  );
}

const pageHeaderStyles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#2ecc40",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export const commonStyles = StyleSheet.create({
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
