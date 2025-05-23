import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFontLoading } from '@/hooks/useFont';
import { View, Text } from 'react-native';

export default function RootLayout() {
  useFrameworkReady();
  const { fontsLoaded, fontError } = useFontLoading();

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="route-details" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="map" options={{ animation: 'slide_from_bottom', presentation: 'modal' }} />
        <Stack.Screen name="filters" options={{ animation: 'slide_from_bottom', presentation: 'modal' }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}