import { Ionicons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

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
];

interface CustomDrawerContentProps extends DrawerContentComponentProps {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

export default function CustomDrawerContent(props: CustomDrawerContentProps) {
  const { expanded, setExpanded } = props;
  const currentRoute = props.state.routeNames[props.state.index];
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  return (
    <View style={styles.fullContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            if (isTablet) setExpanded(!expanded);
          }}
          style={styles.drawerItemBase}
        >
          <View style={styles.iconFixedColumn}>
            <Ionicons name="menu-outline" size={29} color="#222" />
          </View>
          {expanded && <Text style={styles.menuTitle}>MENU</Text>}
        </TouchableOpacity>

        <View style={styles.itemsContainer}>
          {screens.map(({ label, icon, screen }) => {
            const focused = currentRoute === screen;
            return (
              <TouchableOpacity
                key={screen}
                onPress={() => props.navigation.navigate(screen)}
                style={[styles.drawerItemBase, focused && styles.activeItem]}
              >
                <View style={styles.iconFixedColumn}>
                  <Ionicons
                    name={icon as any}
                    size={24}
                    color={focused ? "#fff" : "#2ecc40"}
                  />
                </View>
                {expanded && (
                  <Text style={[styles.label, focused && styles.activeLabel]}>
                    {label}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={[styles.userBlock, !expanded && styles.userBlockCollapsed]}>
        <View style={[styles.userInfo, !expanded && styles.userInfoCollapsed]}>
          <Ionicons name="person-circle-outline" size={36} color="#2ecc40" />
          {expanded && (
            <View style={{ marginLeft: 0 }}>
              <Text style={styles.userName}>ANDRES CANTLON</Text>
              <Text style={styles.userRole}>ADMIN</Text>
            </View>
          )}
        </View>
        {expanded && (
          <Image
            source={require("../assets/images/icon.png")}
            style={styles.logo}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  itemsContainer: {
    marginTop: 8,
  },
  iconFixedColumn: {
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  drawerItemBase: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  menuTitle: {
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
    color: "#222",
    marginLeft: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#222",
    marginLeft: 20,
  },
  activeItem: {
    backgroundColor: "#2ecc40",
  },
  activeLabel: {
    color: "#fff",
  },
  userBlock: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    padding: 12,
    alignItems: "flex-start",
  },
  userBlockCollapsed: {
    alignItems: "center",
    paddingHorizontal: 0,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    justifyContent: "flex-start",
  },
  userInfoCollapsed: {
    justifyContent: "center",
  },
  userName: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#222",
  },
  userRole: {
    fontSize: 11,
    color: "#888",
  },
  logo: {
    width: 60,
    height: 20,
    resizeMode: "contain",
    marginTop: 4,
  },
});
