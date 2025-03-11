import BottomNavBar from '../components/BottomNavBar';
import React, { useState } from 'react';
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
  ScrollView,
  ImageSourcePropType,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Define types
interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
  avatar: ImageSourcePropType;
}

interface Destination {
  id: string;
  name: string;
  location: string;
  rating: number;
  difficulty: string;
  image: ImageSourcePropType;
}

// Sample review data
const REVIEWS: Review[] = [
  {
    id: '1',
    username: 'Ryu80@gmail.com',
    rating: 4,
    comment: 'Heaven on Earth!!!',
    date: 'Jan 1,2024',
    avatar: require('../assets/images/user1.png'),
  },
  {
    id: '2',
    username: 'Rriii990@gmail.com',
    rating: 3,
    comment: 'Heaven on Earth!!!',
    date: 'Jan 1,2024',
    avatar: require('../assets/images/user2.png'),
  },
];

const ReviewsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Reviews' | 'Details'>('Reviews');
  const [reviewText, setReviewText] = useState<string>('');
  const [userRating, setUserRating] = useState<number>(0);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const router = useRouter();
  const params = useLocalSearchParams();

  // This would usually come from params or context
  const destination: Destination = {
    id: '1',
    name: 'Mt Everest',
    location: 'Solukhumbu District',
    rating: 4.0,
    difficulty: 'Hard',
    image: require('../assets/images/destination1.png'),
  };

  const handleRatingPress = (rating: number): void => {
    setUserRating(rating);
  };

  const handleSubmitReview = (): void => {
    // Logic to submit review
    console.log('Submitting review:', { rating: userRating, text: reviewText });
    // Clear form and hide it
    setReviewText('');
    setUserRating(0);
    setShowReviewForm(false);
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            disabled={!interactive}
            onPress={() => interactive && handleRatingPress(star)}
          >
            <FontAwesome
              name={star <= rating ? 'star' : 'star-o'}
              size={interactive ? 24 : 14}
              color="#FFD700"
              style={{ marginHorizontal: 2 }}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderReviewItem = ({ item }: { item: Review }) => {
    return (
      <View style={styles.reviewItem}>
        <View style={styles.reviewHeader}>
          <Image source={item.avatar} style={styles.reviewerAvatar} />
          <View style={styles.reviewerInfo}>
            <Text style={styles.reviewerName}>{item.username}</Text>
            <View style={styles.reviewRating}>
              {renderStars(item.rating)}
            </View>
          </View>
          <Text style={styles.reviewDate}>{item.date}</Text>
        </View>
        <View style={styles.commentContainer}>
          <Text style={styles.comment}>{item.comment}</Text>
        </View>
      </View>
    );
  };

  const handleBack = (): void => {
    router.back();
  };

  const toggleTab = (tab: 'Reviews' | 'Details'): void => {
    setActiveTab(tab);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Destination Image with Back Button and Favorite Button */}
        <View style={styles.imageContainer}>
          <Image source={destination.image} style={styles.destinationImage} />
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Feather name="chevron-left" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton}>
            <Feather name="heart" size={24} color="white" />
          </TouchableOpacity>
          
          {/* Image indicator dots */}
          <View style={styles.imageDots}>
            {[1, 2, 3, 4, 5].map((dot) => (
              <View 
                key={dot} 
                style={[
                  styles.dot, 
                  { backgroundColor: dot === 1 ? 'white' : 'rgba(255,255,255,0.5)' }
                ]} 
              />
            ))}
          </View>
        </View>

        {/* Tab navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Details' && styles.activeTab]} 
            onPress={() => toggleTab('Details')}
          >
            <Text style={styles.tabText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Reviews' && styles.activeTab]} 
            onPress={() => toggleTab('Reviews')}
          >
            <Text style={styles.tabText}>Reviews</Text>
          </TouchableOpacity>
        </View>

        {/* Destination Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.destinationName}>{destination.name}</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Location: </Text>
            <Text style={styles.locationValue}>{destination.location}</Text>
          </View>
          <View style={styles.reviewsContainer}>
            <Text style={styles.reviewsLabel}>Reviews: </Text>
            {renderStars(destination.rating)}
            <Text style={styles.ratingValue}>{destination.rating.toFixed(1)}</Text>
          </View>
          <View style={styles.difficultyContainer}>
            <Text style={styles.difficultyLabel}>Difficulty level: </Text>
            <Text style={styles.difficultyValue}>{destination.difficulty}</Text>
          </View>
        </View>

        {activeTab === 'Reviews' && (
          <View style={styles.reviewsSection}>
            {showReviewForm ? (
              <View style={styles.writeReviewContainer}>
                <View style={styles.reviewerRow}>
                  <Image 
                    source={require('../assets/images/user1.png')} 
                    style={styles.userAvatar} 
                  />
                  <View style={styles.ratingInputContainer}>
                    <Text style={styles.ratingLabel}>Star Rating:</Text>
                    {renderStars(userRating, true)}
                  </View>
                </View>
                <TextInput
                  style={styles.reviewInput}
                  placeholder="Write a Review..."
                  multiline
                  value={reviewText}
                  onChangeText={setReviewText}
                />
                <TouchableOpacity 
                  style={styles.submitButton} 
                  onPress={handleSubmitReview}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <FlatList
                  data={REVIEWS}
                  renderItem={renderReviewItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  contentContainerStyle={styles.reviewsList}
                />
                <TouchableOpacity 
                  style={styles.writeReviewButton} 
                  onPress={() => setShowReviewForm(true)}
                >
                  <Text style={styles.writeReviewButtonText}>Write Review</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        {activeTab === 'Details' && (
          <View style={styles.detailsSection}>
            <Text style={styles.detailsText}>
              Details about Mt Everest would appear here. Information about hiking trails, 
              best times to visit, accommodations, guides, and other important details 
              about the destination.
            </Text>
          </View>
        )}
      </ScrollView>
      <BottomNavBar />

    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 10,
  },
  favoriteButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
  imageDots: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    zIndex: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    margin: 15,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 30,
  },
  activeTab: {
    backgroundColor: '#2F6F6F',
  },
  tabText: {
    fontWeight: '600',
    color: '#333',
  },
  infoContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  destinationName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  locationLabel: {
    fontWeight: 'bold',
  },
  locationValue: {
    color: '#2F6F6F',
  },
  reviewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  reviewsLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    marginLeft: 5,
  },
  difficultyContainer: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  difficultyLabel: {
    fontWeight: 'bold',
  },
  difficultyValue: {
    fontWeight: 'bold',
  },
  reviewsSection: {
    paddingHorizontal: 15,
  },
  reviewsList: {
    paddingBottom: 15,
  },
  reviewItem: {
    marginBottom: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  reviewerName: {
    fontWeight: '500',
  },
  reviewRating: {
    flexDirection: 'row',
    marginTop: 3,
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
  },
  commentContainer: {
    marginTop: 10,
  },
  comment: {
    color: '#333',
  },
  writeReviewButton: {
    backgroundColor: '#2F6F6F',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  writeReviewButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  writeReviewContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  ratingInputContainer: {
    flex: 1,
    marginLeft: 10,
  },
  ratingLabel: {
    marginBottom: 5,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#2F6F6F',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  detailsSection: {
    padding: 15,
    marginBottom: 60,
  },
  detailsText: {
    lineHeight: 22,
    color: '#333',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navButton: {
    alignItems: 'center',
  },
});

export default ReviewsScreen;