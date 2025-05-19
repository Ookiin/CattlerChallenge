import NotAvailable from "@/components/NotAvailable";
import { StyleSheet, Text, View } from "react-native";

export default function FeedingScreen() {
  return (
    <View style={pageHeaderStyles.container}>
      <View style={pageHeaderStyles.headerContainer}>
        <Text style={pageHeaderStyles.headerText}>FEEDING</Text>
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
