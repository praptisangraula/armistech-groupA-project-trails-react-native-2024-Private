import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import BottomNavBar from "../components/BottomNavBar";

// Sample user data
const USERS = [
  { id: "1", name: "John Doe", email: "john.doe@example.com", role: "Admin" },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "User",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "User",
  },
  { id: "4", name: "Emily Davis", email: "emily@example.com", role: "Guide" },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael@example.com",
    role: "User",
  },
  { id: "6", name: "Sarah Brown", email: "sarah@example.com", role: "User" },
  { id: "7", name: "David Miller", email: "david@example.com", role: "User" },
  { id: "8", name: "Lisa Taylor", email: "lisa@example.com", role: "Guide" },
];

const AdminUsersScreen: React.FC = () => {
  const router = useRouter();

  const renderUserItem = ({ item }: { item: (typeof USERS)[0] }) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
      <View style={styles.userRole}>
        <Text style={styles.roleText}>{item.role}</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Feather name="more-vertical" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/admin")}
        >
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Users</Text>
        <TouchableOpacity style={styles.addButton}>
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <Text style={styles.searchPlaceholder}>Search users...</Text>
      </View>

      <FlatList
        data={USERS}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
        style={styles.userList}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.bottomPadding} />
      <BottomNavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#2F6F6F",
    padding: 16,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  backButton: {
    padding: 4,
  },
  addButton: {
    padding: 4,
  },
  searchContainer: {
    margin: 16,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    color: "#999",
    fontSize: 16,
  },
  userList: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  userItem: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  userEmail: {
    color: "#666",
    fontSize: 14,
  },
  userRole: {
    marginRight: 8,
    backgroundColor: "#e8f5e9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    color: "#2F6F6F",
    fontSize: 12,
    fontWeight: "500",
  },
  moreButton: {
    padding: 4,
  },
  bottomPadding: {
    height: 80,
  },
});

export default function AdminUsers() {
  return <AdminUsersScreen />;
}
