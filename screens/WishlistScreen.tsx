import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomNavBar from '../components/BottomNavBar';

const WishlistScreen: React.FC = () => {
  const router = useRouter();
  
  const wishlistItems = [
    {
      id: '1',
      name: 'Mt Everest',
      location: 'Solukhumbu District',
      height: '8848 meters',
      image: require('../assets/images/destination1.png'),
      rating: 4.5,
    },
    {
      id: '2',
      name: 'Mt Everest',
      location: 'Solukhumbu District',
      height: '8848 meters',
      image: require('../assets/images/destination2.png'),
      rating: 4.0,
    },
    {
      id: '3',
      name: 'Mt Everest',
      location: 'Solukhumbu District',
      height: '1500 meters',
      image: require('../assets/images/destination3.png'),
      rating: 4.2,
    },
  ];

  const navigateToDestination = (id: string) => {
    router.push({
      pathname: '/reviews',
      params: { id }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Feather name="search" size={18} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Your Next Destination"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.filterButton}>
              <Feather name="sliders" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.wishlistTitle}>Wishlist</Text>

        {wishlistItems.map(item => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.wishlistCard}
            onPress={() => navigateToDestination(item.id)}
          >
            <Image source={item.image} style={styles.cardImage} />
            
            <TouchableOpacity 
              style={styles.heartButton}
              onPress={(e) => {
                // Stop propagation to prevent navigating when heart is pressed
                e.stopPropagation();
              }}
            >
              <Feather name="heart" size={16} color="#2F6F6F" />
            </TouchableOpacity>
            
            <View style={styles.cardContent}>
              <View style={styles.titleRow}>
                <Text style={styles.cardTitle}>{item.name} - <Text style={styles.cardLocation}>{item.location}</Text></Text>
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Feather 
                      key={star}
                      name="star" 
                      size={12} 
                      color={star <= Math.floor(item.rating) ? "#FFD700" : "#ddd"} 
                      style={styles.starIcon}
                    />
                  ))}
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
              
              <Text style={styles.heightText}>Height - {item.height}</Text>
              
              <TouchableOpacity 
                style={styles.exploreButton}
                onPress={() => navigateToDestination(item.id)}
              >
                <Text style={styles.exploreButtonText}>Explore Now</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8f8',
  },
  scrollView: {
    flex: 1,
    marginBottom: 60,
  },
  searchContainer: {
    backgroundColor: '#f0f8f8',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
  },
  filterButton: {
    backgroundColor: '#2F6F6F',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
    marginHorizontal: 20,
  },
  wishlistCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  heartButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 15,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardLocation: {
    fontWeight: 'normal',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 2,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
  },
  heightText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  exploreButton: {
    backgroundColor: '#2F6F6F',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  exploreButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default WishlistScreen;