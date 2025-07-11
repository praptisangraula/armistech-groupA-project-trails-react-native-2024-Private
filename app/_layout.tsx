import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="home" />
        <Stack.Screen name="explore" />
        <Stack.Screen name="saved" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="editProfile" />
        <Stack.Screen name="trips" />
        <Stack.Screen name="admin" />
        <Stack.Screen name="admin-users" />
        <Stack.Screen name="admin-trails" />
        <Stack.Screen name="admin-reviews" />
        <Stack.Screen name="admin-settings" />
      </Stack>
    </>
  );
}
