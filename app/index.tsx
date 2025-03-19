import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        setIsAuthenticated(!!token);
      } catch (e) {
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return null;
  }
  
  // Redirect based on authentication status
  return isAuthenticated ? <Redirect href="/home" /> : <Redirect href="/login" />;
}