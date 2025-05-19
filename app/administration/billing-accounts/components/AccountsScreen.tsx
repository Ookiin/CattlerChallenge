import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AccountsScreen() {
  return (
    <View style={styles.notAvailableContainer}>
      <Text style={styles.notAvailableText}>
        Accounts section is not available yet
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
