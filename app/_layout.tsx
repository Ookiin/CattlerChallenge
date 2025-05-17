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
import { store } from "../redux/store";

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
        />
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
