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
import { StyleSheet, useWindowDimensions, View } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [expanded, setExpanded] = useState(false);
  const { width, height } = useWindowDimensions();

  const isTablet = width >= 768;
  const drawerWidth = expanded ? 240 : 72;
  const drawerType = isTablet ? "permanent" : "front";

  // Detectar si el dispositivo es un teléfono pequeño y está en landscape
  const isPhone = width < 768;
  const isLandscape = width > height;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        {/* Si es teléfono en landscape, rotar el contenido para simular portrait */}
        <View
          style={[
            styles.innerContainer,
            isPhone && isLandscape && styles.rotateContent,
          ]}
        >
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
        </View>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  rotateContent: {
    flex: 1,
    transform: [{ rotate: "90deg" }],
    // Ajustamos para que quepa en pantalla luego de rotar:
    width: "100%",
    height: "100%",
  },
});
