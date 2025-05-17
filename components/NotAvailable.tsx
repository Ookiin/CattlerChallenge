import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface NotAvailableProps {
  title?: string;
  subtitle?: string;
}

const NotAvailable = ({
  title = "Not Available",
  subtitle = "This section is under development",
}: NotAvailableProps) => {
  return (
    <View style={styles.container}>
      <Ionicons name="construct-outline" size={64} color="#666" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
});

export default NotAvailable;
