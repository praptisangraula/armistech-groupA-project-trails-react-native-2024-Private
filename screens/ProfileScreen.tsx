import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavBar';
import * as SecureStore from 'expo-secure-store';

const ProfileScreen: React.FC = () => {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push('/editProfile');
  };

  const handleLogout = async () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            await SecureStore.deleteItemAsync('userToken'); 
            router.replace('/login'); 
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleBack = () => {
    router.replace('/home'); 
  };

  const destinationImages = [
    { id: '1', source: require('../assets/images/destination1.png') },
    { id: '2', source: require('../assets/images/destination2.png') },
    { id: '3', source: require('../assets/images/destination5.png') },
  ];

  const bookmarkedImages = [
    { id: '4', source: require('../assets/images/waterfall.png') },
    { id: '5', source: require('../assets/images/night-sky.png') },
    { id: '6', source: require('../assets/images/cycling.png') },
  ];

  const handleWishlistNavigation = () => {
    router.push('/saved'); 
  };
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>User profile</Text>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../assets/images/profile-image.png')}
              style={styles.profileImage}
            />
            <View style={styles.editIconContainer}>
              <Feather name="edit-2" size={14} color="white" />
            </View>
          </View>

          <Text style={styles.userName}>DAVID MALIK</Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.favoriteButton} onPress={handleWishlistNavigation}>
              <Feather name="heart" size={20} color="#2F6F6F" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
              <Text style={styles.editProfileText}>Edit profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shareButton}>
              <Feather name="share-2" size={20} color="#2F6F6F" />
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Recently Viewed</Text>
            <View style={styles.imageGrid}>
              {destinationImages.map(image => (
                <Image key={image.id} source={image.source} style={styles.destinationImage} />
              ))}
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Bookmarks</Text>
            <View style={styles.imageGrid}>
              {bookmarkedImages.map(image => (
                <Image key={image.id} source={image.source} style={styles.destinationImage} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollView: {
    flex: 1,
    marginBottom: 60,
  },
  header: {
    backgroundColor: '#7FA5A5',
    height: 100,
    paddingTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
    marginLeft: 20,
  },
  backButton: {
    padding: 5,
  },
  profileContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  profileImageContainer: {
    marginTop: -40,
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2F6F6F',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2F6F6F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  editProfileButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2F6F6F',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  editProfileText: {
    color: 'white',
    fontWeight: '500',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2F6F6F',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  logoutButton: {
    width: '60%', 
    paddingVertical: 10,
    borderWidth: 1, 
    borderColor: '#FF6B6B', 
    backgroundColor: 'transparent', 
    borderRadius: 5, 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoutButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '500',
  },
  
  sectionContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  imageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  destinationImage: {
    width: '31%',
    height: 80,
    borderRadius: 8,
  },
});

export default ProfileScreen;