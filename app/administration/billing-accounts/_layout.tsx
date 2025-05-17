import { Stack } from "expo-router";
import React from "react";

export default function BillingAccountsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f5f5f5" },
      }}
    >
      <Stack.Screen name="index" options={{}} />
      <Stack.Screen
        name="new-payment"
        options={{
          presentation: "modal",
          title: "Add New Payment",
        }}
      />
    </Stack>
  );
}
