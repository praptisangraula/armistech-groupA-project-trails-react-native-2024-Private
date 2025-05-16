import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import BottomNavBar from "../components/BottomNavBar";

const AdminSettingsScreen: React.FC = () => {
  const router = useRouter();

  // State for toggle switches
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [userRegistrationOpen, setUserRegistrationOpen] = useState(true);
  const [reviewModeration, setReviewModeration] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const SettingSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const SettingItem = ({
    icon,
    title,
    description,
    value,
    onValueChange,
  }: {
    icon: string;
    title: string;
    description: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
  }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingIcon}>
        <Feather name={icon as any} size={20} color="#2F6F6F" />
      </View>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#ccc", true: "#82CDD6" }}
        thumbColor={value ? "#2F6F6F" : "#f4f3f4"}
      />
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
        <Text style={styles.headerTitle}>System Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <SettingSection title="General">
          <SettingItem
            icon="users"
            title="User Registration"
            description="Allow new users to register"
            value={userRegistrationOpen}
            onValueChange={setUserRegistrationOpen}
          />

          <SettingItem
            icon="bell"
            title="Notifications"
            description="Enable system notifications"
            value={notificationEnabled}
            onValueChange={setNotificationEnabled}
          />

          <SettingItem
            icon="moon"
            title="Dark Mode"
            description="Use dark theme"
            value={darkMode}
            onValueChange={setDarkMode}
          />
        </SettingSection>

        <SettingSection title="Content">
          <SettingItem
            icon="message-square"
            title="Review Moderation"
            description="Manually approve all reviews"
            value={reviewModeration}
            onValueChange={setReviewModeration}
          />

          <TouchableOpacity style={styles.clickableItem}>
            <View style={styles.settingIcon}>
              <Feather name="grid" size={20} color="#2F6F6F" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Content Categories</Text>
              <Text style={styles.settingDescription}>
                Manage trail categories
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.clickableItem}>
            <View style={styles.settingIcon}>
              <Feather name="tag" size={20} color="#2F6F6F" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Difficulty Levels</Text>
              <Text style={styles.settingDescription}>
                Configure trail difficulty ratings
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#999" />
          </TouchableOpacity>
        </SettingSection>

        <SettingSection title="System">
          <SettingItem
            icon="pie-chart"
            title="Analytics"
            description="Collect anonymous usage data"
            value={analyticsEnabled}
            onValueChange={setAnalyticsEnabled}
          />

          <SettingItem
            icon="tool"
            title="Maintenance Mode"
            description="Take app offline for updates"
            value={maintenanceMode}
            onValueChange={setMaintenanceMode}
          />

          <TouchableOpacity style={styles.clickableItem}>
            <View style={styles.settingIcon}>
              <Feather name="database" size={20} color="#2F6F6F" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Database</Text>
              <Text style={styles.settingDescription}>
                Backup and restore options
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.clickableItem}>
            <View style={styles.settingIcon}>
              <Feather name="lock" size={20} color="#2F6F6F" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Security</Text>
              <Text style={styles.settingDescription}>
                Authentication and privacy settings
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#999" />
          </TouchableOpacity>
        </SettingSection>

        <TouchableOpacity style={styles.dangerButton}>
          <Text style={styles.dangerButtonText}>Reset All Settings</Text>
        </TouchableOpacity>

        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Trails Admin v1.0.0</Text>
        </View>

        {/* Add bottom padding for nav bar */}
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
    width: 32,
  },
  headerRight: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  clickableItem: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F7F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: "#666",
  },
  dangerButton: {
    backgroundColor: "#ffebee",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  dangerButtonText: {
    color: "#f44336",
    fontWeight: "500",
  },
  versionInfo: {
    alignItems: "center",
    marginVertical: 16,
  },
  versionText: {
    fontSize: 12,
    color: "#999",
  },
  bottomPadding: {
    height: 80,
  },
});

export default function AdminSettings() {
  return <AdminSettingsScreen />;
}
