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

// Sample reviews data
const REVIEWS = [
  {
    id: "1",
    trailName: "Mountain View Trail",
    userName: "John Doe",
    rating: 4.5,
    comment:
      "Beautiful views and well-maintained paths. Would highly recommend for a day trip.",
    status: "Pending",
    date: "May 15, 2025",
    userImage: require("../assets/images/user1.png"),
  },
  {
    id: "2",
    trailName: "Lakeside Path",
    userName: "Jane Smith",
    rating: 5,
    comment:
      "Absolutely stunning trail! The lake views are incredible and there are plenty of spots to rest.",
    status: "Approved",
    date: "May 14, 2025",
    userImage: require("../assets/images/user2.png"),
  },
  {
    id: "3",
    trailName: "Forest Adventure",
    userName: "Robert Johnson",
    rating: 3,
    comment:
      "Trail was more difficult than advertised. Some areas need maintenance.",
    status: "Pending",
    date: "May 13, 2025",
    userImage: require("../assets/images/profile.png"),
  },
  {
    id: "4",
    trailName: "Desert Canyon Trek",
    userName: "Emily Davis",
    rating: 4,
    comment:
      "Amazing geological formations! Bring plenty of water as it gets very hot.",
    status: "Flagged",
    date: "May 12, 2025",
    userImage: require("../assets/images/user1.png"),
  },
  {
    id: "5",
    trailName: "Coastal Pathway",
    userName: "Michael Wilson",
    rating: 4.5,
    comment: "The ocean views are breathtaking. Great trail for families.",
    status: "Approved",
    date: "May 10, 2025",
    userImage: require("../assets/images/user2.png"),
  },
];

const AdminReviewsScreen: React.FC = () => {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "#4caf50";
      case "Pending":
        return "#ff9800";
      case "Flagged":
        return "#f44336";
      default:
        return "#2F6F6F";
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Feather
            key={`star-${i}`}
            name="star"
            size={14}
            color="#FFD700"
            style={{ marginRight: 2 }}
          />
        );
      } else if (i === fullStars && halfStar) {
        stars.push(
          <Feather
            key={`star-${i}`}
            name="star"
            size={14}
            color="#FFD700"
            style={{ marginRight: 2, opacity: 0.5 }}
          />
        );
      } else {
        stars.push(
          <Feather
            key={`star-${i}`}
            name="star"
            size={14}
            color="#CCC"
            style={{ marginRight: 2 }}
          />
        );
      }
    }

    return <View style={{ flexDirection: "row" }}>{stars}</View>;
  };

  const renderReviewItem = ({ item }: { item: (typeof REVIEWS)[0] }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Image source={item.userImage} style={styles.userImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.trailName}>{item.trailName}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: `${getStatusColor(item.status)}20` },
          ]}
        >
          <Text
            style={[styles.statusText, { color: getStatusColor(item.status) }]}
          >
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.ratingContainer}>
        {renderStars(item.rating)}
        <Text style={styles.reviewDate}>{item.date}</Text>
      </View>

      <Text style={styles.reviewComment}>{item.comment}</Text>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.approveButton]}
          disabled={item.status === "Approved"}
        >
          <Feather
            name="check"
            size={16}
            color={item.status === "Approved" ? "#999" : "#4caf50"}
          />
          <Text
            style={[
              styles.actionText,
              { color: item.status === "Approved" ? "#999" : "#4caf50" },
            ]}
          >
            Approve
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Feather name="edit-2" size={16} color="#2F6F6F" />
          <Text style={[styles.actionText, { color: "#2F6F6F" }]}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.rejectButton]}>
          <Feather name="x" size={16} color="#f44336" />
          <Text style={[styles.actionText, { color: "#f44336" }]}>Reject</Text>
        </TouchableOpacity>
      </View>
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
        <Text style={styles.headerTitle}>Review Approval</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
          <Text style={styles.activeFilterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Approved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Flagged</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={REVIEWS}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id}
        style={styles.reviewList}
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
    width: 32,
  },
  headerRight: {
    width: 32,
  },
  filterContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 16,
  },
  activeFilter: {
    backgroundColor: "#2F6F6F",
  },
  filterText: {
    color: "#666",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "white",
    fontWeight: "500",
  },
  reviewList: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  reviewItem: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  trailName: {
    color: "#666",
    fontSize: 14,
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
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  reviewDate: {
    fontSize: 12,
    color: "#999",
  },
  reviewComment: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "500",
  },
  approveButton: {
    // Styles specific to approve button if needed
  },
  rejectButton: {
    // Styles specific to reject button if needed
  },
  bottomPadding: {
    height: 80,
  },
});

export default function AdminReviews() {
  return <AdminReviewsScreen />;
}
