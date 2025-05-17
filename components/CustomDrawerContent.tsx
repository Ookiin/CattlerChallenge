import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const screens = [
  { label: "Dashboard", icon: "grid-outline", screen: "dashboard" },
  { label: "Yard Sheet", icon: "cube-outline", screen: "yard-sheet" },
  { label: "Cattle", icon: "paw-outline", screen: "cattle" },
  { label: "Feeding", icon: "fast-food-outline", screen: "feeding" },
  { label: "Animal Health", icon: "medkit-outline", screen: "animal-health" },
  { label: "Chute", icon: "construct-outline", screen: "chute" },
  { label: "Supplies", icon: "cart-outline", screen: "supplies" },
  { label: "Reports", icon: "document-text-outline", screen: "reports" },
  {
    label: "Administration",
    icon: "settings-outline",
    screen: "administration",
  },
  { label: "Settings", icon: "cog-outline", screen: "settings" },
  { label: "Profile", icon: "person-outline", screen: "profile" },
];

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const [expanded, setExpanded] = useState(false);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={styles.toggleButton}
      >
        <Ionicons name="menu-outline" size={30} />
      </TouchableOpacity>

      {screens.map(({ label, icon, screen }) => (
        <DrawerItem
          key={screen}
          label={expanded ? label : ""}
          icon={({ color, size }) => (
            <Ionicons name={icon as any} size={size} color={color} />
          )}
          onPress={() => props.navigation.navigate(screen)}
          style={styles.drawerItem}
        />
      ))}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  toggleButton: {
    margin: 10,
    padding: 5,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  drawerItem: {
    justifyContent: "center",
  },
});
