import { Stack } from "expo-router";

export default function AdministrationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="billing-accounts"
        options={{ title: "Billing & Accounts" }}
      />
    </Stack>
  );
}
