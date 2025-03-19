import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavBar';

const HomeScreen = () => {
  const router = useRouter();

  const navigateToDestination = (id: string) => {
    router.push({
      pathname: '/reviews',
      params: { id }
    });
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#666" />
          <Text style={styles.searchText}>Your best destination</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="sliders" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured Image */}
        <View style={styles.featuredContainer}>
          <Image 
            source={require('../assets/images/featured-image.png')} // Update with your local image
            style={styles.featuredImage} 
          />
          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={() => navigateToDestination('featured')}
          >
            <Text style={styles.exploreButtonText}>Explore Now</Text>
          </TouchableOpacity>
          
          {/* Navigation Dots */}
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
        
        {/* Discover Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Discover</Text>
          
          {/* Destination Cards */}
          <View style={styles.cardContainer}>
            <TouchableOpacity 
              style={styles.card}
              onPress={() => navigateToDestination('white-gumba')}
            >
              <Image 
                source={require('../assets/images/white-gumba.png')} // Update with your local image
                style={styles.cardImage} 
              />
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.cardTitle}>White Gumba</Text>
                  <Text style={styles.cardDescription}>The White Monastery Nepal (called Seto Gumba) is a good place to visit</Text>
                </View>
                <TouchableOpacity style={styles.infoButton}>
                  <Feather name="more-vertical" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
              <View style={styles.cardFooter}>
                <View style={styles.ratingContainer}>
                  <Feather name="star" size={16} color="#2F6F6F" />
                  <Text style={styles.ratingText}>(5.0)</Text>
                </View>
                <TouchableOpacity 
                  style={styles.bookButton}
                  onPress={() => navigateToDestination('white-gumba')}
                >
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
                <Text style={styles.distanceText}>9.84km</Text>
              </View>
            </TouchableOpacity>
            
            {/* Pokhara Card */}
            <TouchableOpacity 
              style={styles.card}
              onPress={() => navigateToDestination('pokhara')}
            >
              <Image 
                source={require('../assets/images/pokhara.png')} // Update with your local image
                style={styles.cardImage} 
              />
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.cardTitle}>Pokhara</Text>
                  <Text style={styles.cardDescription}>Pokhara Valley is the second-largest valley and the western region of Nepal. It is in the western part of Nepal</Text>
                </View>
                <TouchableOpacity style={styles.infoButton}>
                  <Feather name="more-vertical" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
              <View style={styles.cardFooter}>
                <View style={styles.ratingContainer}>
                  <Feather name="star" size={16} color="#2F6F6F" />
                  <Text style={styles.ratingText}>(5.0)</Text>
                </View>
                <TouchableOpacity 
                  style={styles.bookButton}
                  onPress={() => navigateToDestination('pokhara')}
                >
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
                <Text style={styles.distanceText}>13.5km</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Bottom padding to ensure content isn't hidden behind nav bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
  },
  searchText: {
    marginLeft: 10,
    color: '#666',
  },
  filterButton: {
    backgroundColor: '#2F6F6F',
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredContainer: {
    position: 'relative',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 15,
    overflow: 'hidden',
    height: 180,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  exploreButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#2F6F6F',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  exploreButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  cardContainer: {
    gap: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    lineHeight: 16,
  },
  infoButton: {
    backgroundColor: '#2F6F6F',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#2F6F6F',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  distanceText: {
    fontSize: 12,
    color: '#666',
  },
  bottomPadding: {
    height: 80,
  }
});

export default HomeScreen;  