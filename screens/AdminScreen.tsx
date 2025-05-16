import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import BottomNavBar from "../components/BottomNavBar";

const AdminScreen: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Panel</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>152</Text>
            <Text style={styles.statLabel}>Total Users</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>47</Text>
            <Text style={styles.statLabel}>New Reviews</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>86</Text>
            <Text style={styles.statLabel}>Active Trails</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Quick Actions</Text>{" "}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/admin-users")}
        >
          <Feather name="users" size={22} color="#2F6F6F" />
          <Text style={styles.actionButtonText}>Manage Users</Text>
          <Feather name="chevron-right" size={22} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/admin-trails")}
        >
          <Feather name="map" size={22} color="#2F6F6F" />
          <Text style={styles.actionButtonText}>Manage Trails</Text>
          <Feather name="chevron-right" size={22} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/admin-reviews")}
        >
          <Feather name="star" size={22} color="#2F6F6F" />
          <Text style={styles.actionButtonText}>Review Approval</Text>
          <Feather name="chevron-right" size={22} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/admin-settings")}
        >
          <Feather name="settings" size={22} color="#2F6F6F" />
          <Text style={styles.actionButtonText}>System Settings</Text>
          <Feather name="chevron-right" size={22} color="#666" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Feather name="user-plus" size={16} color="#fff" />
          </View>
          <View style={styles.activityInfo}>
            <Text style={styles.activityText}>New user registration</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, { backgroundColor: "#e67e22" }]}>
            <Feather name="star" size={16} color="#fff" />
          </View>
          <View style={styles.activityInfo}>
            <Text style={styles.activityText}>New review submitted</Text>
            <Text style={styles.activityTime}>5 hours ago</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, { backgroundColor: "#3498db" }]}>
            <Feather name="map-pin" size={16} color="#fff" />
          </View>
          <View style={styles.activityInfo}>
            <Text style={styles.activityText}>New trail added</Text>
            <Text style={styles.activityTime}>1 day ago</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, { backgroundColor: "#e74c3c" }]}>
            <Feather name="alert-triangle" size={16} color="#fff" />
          </View>
          <View style={styles.activityInfo}>
            <Text style={styles.activityText}>Report flagged for review</Text>
            <Text style={styles.activityTime}>2 days ago</Text>
          </View>
        </View>
        {/* Add some bottom padding to ensure content is visible above the nav bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>

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
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    flex: 1,
    margin: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2F6F6F",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
    color: "#333",
  },
  actionButton: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  actionButtonText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: "#333",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#27ae60",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: "#333",
  },
  activityTime: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  bottomPadding: {
    height: 80,
  },
});

export default AdminScreen;
