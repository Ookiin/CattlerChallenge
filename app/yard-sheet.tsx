import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NotAvailable from "../components/NotAvailable";

export default function YardSheet() {
  return (
    <View style={pageHeaderStyles.container}>
      <View style={pageHeaderStyles.headerContainer}>
        <Text style={pageHeaderStyles.headerText}>YARD SHEET</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <NotAvailable />
      </View>
    </View>
  );
}

const pageHeaderStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
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
