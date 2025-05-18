import { Stack } from "expo-router";
import React from "react";

export default function BillingAccountsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="new-payment" />
    </Stack>
  );
}
