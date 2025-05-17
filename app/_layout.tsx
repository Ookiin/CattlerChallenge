import CustomDrawerContent from "@/components/CustomDrawerContent";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [expanded, setExpanded] = useState(false);
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;
  const drawerWidth = expanded ? 240 : 72;

  const drawerType = isTablet ? "permanent" : "front";

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Drawer
          drawerContent={(props) => (
            <CustomDrawerContent
              {...props}
              expanded={drawerType === "front" ? true : expanded}
              setExpanded={setExpanded}
            />
          )}
          screenOptions={{
            headerShown: true,
            drawerType,
            swipeEdgeWidth: isTablet ? 0 : 50,
            drawerStyle: {
              width: drawerType === "front" ? 240 : drawerWidth,
            },
            overlayColor:
              drawerType === "front" ? "rgba(0,0,0,0.3)" : "transparent",
          }}
        >
          <Drawer.Screen name="index" options={{ headerShown: false }} />
          <Drawer.Screen
            name="dashboard"
            options={{ headerShown: false, title: "Dashboard" }}
          />
          <Drawer.Screen
            name="yard-sheet"
            options={{ headerShown: false, title: "Yard Sheet" }}
          />
          <Drawer.Screen
            name="cattle"
            options={{ headerShown: false, title: "Cattle" }}
          />
          <Drawer.Screen
            name="feeding"
            options={{ headerShown: false, title: "Feeding" }}
          />
          <Drawer.Screen
            name="animal-health"
            options={{ headerShown: false, title: "Animal Health" }}
          />
          <Drawer.Screen
            name="chute"
            options={{ headerShown: false, title: "Chute" }}
          />
          <Drawer.Screen
            name="supplies"
            options={{ headerShown: false, title: "Supplies" }}
          />
          <Drawer.Screen
            name="reports"
            options={{ headerShown: false, title: "Reports" }}
          />

          <Drawer.Screen
            name="settings"
            options={{ title: "Settings", headerShown: false }}
          />
        </Drawer>
        <StatusBar hidden={true} />
      </ThemeProvider>
    </Provider>
  );
}
