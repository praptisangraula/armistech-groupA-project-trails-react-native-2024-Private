import React, { useState } from 'react';
import BottomNavBar from '@/components/BottomNavBar';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Define the type for destination items
interface Destination {
  id: string;
  name: string;
  district: string;
  height: string;
  difficulty: string;
  rating: number;
  image: ImageSourcePropType;
  category: string;
}

// Sample data based on your images
const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Mt Everest',
    district: 'Solukhumbu District',
    height: '8849 meters',
    difficulty: 'Hard',
    rating: 4.0,
    image: require('../assets/images/destination1.png'),
    category: 'Mountain',
  },
  {
    id: '2',
    name: 'Mt Everest',
    district: 'Solukhumbu District',
    height: '8849 meters',
    difficulty: 'Hard',
    rating: 4.0,
    image: require('../assets/images/destination2.png'),
    category: 'Camp',
  },
  {
    id: '3',
    name: 'Mt Everest',
    district: 'Solukhumbu District',
    height: '8849 meters',
    difficulty: 'Hard',
    rating: 4.0,
    image: require('../assets/images/destination3.png'),
    category: 'Biking',
  },
  {
    id: '4',
    name: 'Mt Everest',
    district: 'Solukhumbu District',
    height: '8849 meters',
    difficulty: 'Hard',
    rating: 4.0,
    image: require('../assets/images/destination4.png'),
    category: 'Mountain',
  },
];

const CATEGORIES = ['All', 'Mountain', 'Biking', 'Camp'];

const ExploreScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();

  const filteredDestinations = DESTINATIONS.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const renderDestinationCard = ({ item }: { item: Destination }) => {
    return (
      <View style={styles.card}>
        <Image source={item.image} style={styles.cardImage} />
        <TouchableOpacity style={styles.favoriteButton}>
          <Feather name="heart" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesome
              key={star}
              name={star <= Math.floor(item.rating) ? 'star' : (star <= item.rating + 0.5 ? 'star-half-o' : 'star-o')}
              size={14}
              color="#FFD700"
            />
          ))}
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
        </View>
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.destinationName}>
              {item.name} - {item.district}
            </Text>
            <Text style={styles.destinationHeight}>Height - {item.height}</Text>
          </View>
          <View style={styles.difficultyContainer}>
            <Text style={styles.difficultyText}>{item.difficulty}</Text>
          </View>
        </View>
        <TouchableOpacity 
  style={styles.exploreButton} 
  onPress={() => router.push({
    pathname: '/reviews',
    params: { id: item.id }
  })}
>
  <Text style={styles.exploreButtonText}>Explore Now</Text>
</TouchableOpacity>
      </View>
    );
  };

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Your Next Destination"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="sliders" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.categoriesTitle}>Categories</Text>
      <View style={styles.categoriesContainer}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList<Destination>
        data={filteredDestinations}
        renderItem={renderDestinationCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
      <BottomNavBar />  
      
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  searchIcon: {
    marginLeft: 15,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#2F6F6F',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 5,
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  selectedCategoryButton: {
    backgroundColor: '#2F6F6F',
    borderColor: '#2F6F6F',
  },
  categoryText: {
    color: '#666',
  },
  selectedCategoryText: {
    color: 'white',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  favoriteButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 95,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  ratingText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  destinationName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  destinationHeight: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  difficultyContainer: {
    alignItems: 'flex-end',
  },
  difficultyText: {
    color: '#666',
    fontWeight: 'bold',
  },
  exploreButton: {
    backgroundColor: '#2F6F6F',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  exploreButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 2,
    color: '#666',
  },
});

export default ExploreScreen;