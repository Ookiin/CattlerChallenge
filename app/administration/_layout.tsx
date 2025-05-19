import { Stack } from "expo-router";

export default function AdministrationLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#2ecc40",
        },
        headerTintColor: "#fff",
        headerTitle: "ADMINISTRATION",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="billing-accounts"
        options={{
          title: "Billing & Accounts",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
