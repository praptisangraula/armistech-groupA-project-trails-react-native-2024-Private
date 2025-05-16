import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Feather } from "@expo/vector-icons";

interface BottomNavBarProps {}

const BottomNavBar: React.FC<BottomNavBarProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (route: string) => pathname === route;

  return (
    <View style={styles.bottomNav}>
      {" "}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => router.push("/explore")}
      >
        <Feather
          name="search"
          size={24}
          color={isActive("/explore") ? "#2F6F6F" : "#666"}
        />
        <Text
          style={[styles.navText, isActive("/explore") && styles.activeNavText]}
        >
          Explore
        </Text>
      </TouchableOpacity>{" "}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => router.push("/home")}
      >
        <Feather
          name="home"
          size={24}
          color={isActive("/home") ? "#2F6F6F" : "#666"}
        />
        <Text
          style={[styles.navText, isActive("/home") && styles.activeNavText]}
        >
          Home
        </Text>
      </TouchableOpacity>{" "}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => router.push("/saved")}
      >
        <Feather
          name="heart"
          size={24}
          color={isActive("/saved") ? "#2F6F6F" : "#666"}
        />
        <Text
          style={[styles.navText, isActive("/saved") && styles.activeNavText]}
        >
          Saved
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => router.push("/admin")}
      >
        <Feather
          name="shield"
          size={24}
          color={isActive("/admin") ? "#2F6F6F" : "#666"}
        />
        <Text
          style={[styles.navText, isActive("/admin") && styles.activeNavText]}
        >
          Admin
        </Text>
      </TouchableOpacity>{" "}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => router.push("/profile")}
      >
        <Feather
          name="user"
          size={24}
          color={isActive("/profile") ? "#2F6F6F" : "#666"}
        />
        <Text
          style={[styles.navText, isActive("/profile") && styles.activeNavText]}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "white",
    height: 60,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  navButton: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 2,
    color: "#666",
  },
  activeNavText: {
    color: "#2F6F6F",
  },
});

export default BottomNavBar;
