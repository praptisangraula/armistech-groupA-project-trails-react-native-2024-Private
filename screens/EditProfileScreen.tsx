// screens/EditProfileScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavBar';

const EditProfileScreen: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('David Malik');
  const [email, setEmail] = useState('david2000@gmail.com');
  const [phone, setPhone] = useState('98162*****');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('********');
  const [showPassword, setShowPassword] = useState(false);

  const handleUpdate = () => {
    router.replace('/profile');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit profile</Text>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../assets/images/profile-image.png')}
              style={styles.profileImage}
            />
            <View style={styles.cameraIconContainer}>
              <Feather name="camera" size={16} color="white" />
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Full Name"
              />
              <TouchableOpacity style={styles.editIcon}>
                <Feather name="edit-2" size={16} color="#2F6F6F" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
              />
              <TouchableOpacity style={styles.editIcon}>
                <Feather name="edit-2" size={16} color="#2F6F6F" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone Number"
                keyboardType="phone-pad"
              />
              <TouchableOpacity style={styles.editIcon}>
                <Feather name="edit-2" size={16} color="#2F6F6F" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={country}
                onChangeText={setCountry}
                placeholder="Country"
              />
              <TouchableOpacity style={styles.editIcon}>
                <Feather name="chevron-down" size={16} color="#2F6F6F" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                style={styles.editIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Feather name={showPassword ? "eye" : "eye-off"} size={16} color="#2F6F6F" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
              <Text style={styles.updateButtonText}>UPDATE</Text>
            </TouchableOpacity>
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
  cameraIconContainer: {
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
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  input: {
    flex: 1,
    height: 50,
  },
  editIcon: {
    padding: 5,
  },
  updateButton: {
    backgroundColor: '#2F6F6F',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  updateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditProfileScreen;