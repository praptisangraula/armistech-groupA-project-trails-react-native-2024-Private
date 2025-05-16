import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import BottomNavBar from "../components/BottomNavBar";

// Sample trail data
const TRAILS = [
  {
    id: "1",
    name: "Mountain View Trail",
    location: "Rocky Mountains, CO",
    difficulty: "Moderate",
    status: "Active",
    image: require("../assets/images/destination1.png"),
  },
  {
    id: "2",
    name: "Lakeside Path",
    location: "Lake Tahoe, CA",
    difficulty: "Easy",
    status: "Active",
    image: require("../assets/images/destination2.png"),
  },
  {
    id: "3",
    name: "Forest Adventure",
    location: "Redwood National Park, CA",
    difficulty: "Hard",
    status: "Active",
    image: require("../assets/images/destination3.png"),
  },
  {
    id: "4",
    name: "Desert Canyon Trek",
    location: "Grand Canyon, AZ",
    difficulty: "Hard",
    status: "Inactive",
    image: require("../assets/images/destination4.png"),
  },
  {
    id: "5",
    name: "Coastal Pathway",
    location: "Big Sur, CA",
    difficulty: "Moderate",
    status: "Active",
    image: require("../assets/images/destination5.png"),
  },
];

const AdminTrailsScreen: React.FC = () => {
  const router = useRouter();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "#4caf50";
      case "Moderate":
        return "#ff9800";
      case "Hard":
        return "#f44336";
      default:
        return "#2F6F6F";
    }
  };

  const renderTrailItem = ({ item }: { item: (typeof TRAILS)[0] }) => (
    <View style={styles.trailItem}>
      <Image source={item.image} style={styles.trailImage} />
      <View style={styles.trailInfo}>
        <Text style={styles.trailName}>{item.name}</Text>
        <Text style={styles.trailLocation}>
          <Feather name="map-pin" size={12} color="#666" /> {item.location}
        </Text>
        <View style={styles.trailMeta}>
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: `${getDifficultyColor(item.difficulty)}20` },
            ]}
          >
            <Text
              style={[
                styles.difficultyText,
                { color: getDifficultyColor(item.difficulty) },
              ]}
            >
              {item.difficulty}
            </Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  item.status === "Active" ? "#e8f5e9" : "#ffebee",
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: item.status === "Active" ? "#2e7d32" : "#c62828" },
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>
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
        <Text style={styles.headerTitle}>Manage Trails</Text>
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
        <Text style={styles.searchPlaceholder}>Search trails...</Text>
      </View>

      <FlatList
        data={TRAILS}
        renderItem={renderTrailItem}
        keyExtractor={(item) => item.id}
        style={styles.trailList}
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
  trailList: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  trailItem: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  trailImage: {
    width: 80,
    height: "100%",
  },
  trailInfo: {
    flex: 1,
    padding: 12,
  },
  trailName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  trailLocation: {
    color: "#666",
    fontSize: 14,
    marginBottom: 8,
  },
  trailMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: "500",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  moreButton: {
    padding: 12,
    justifyContent: "center",
  },
  bottomPadding: {
    height: 80,
  },
});

export default function AdminTrails() {
  return <AdminTrailsScreen />;
}
