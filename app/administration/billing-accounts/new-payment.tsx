import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});

export default function NewPaymentModal() {
  return (
    <View style={styles.container}>
      <Text>New Payment Modal (Form goes here)</Text>
    </View>
  );
}
