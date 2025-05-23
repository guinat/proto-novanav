import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, FileSliders as Sliders } from 'lucide-react-native';
import { RouteCard } from '@/components/RouteCard';
import Colors from '@/constants/Colors';
import { mockRoutes } from '@/constants/MockData';

export default function RouteResultsScreen() {
  const router = useRouter();
  const { mode = 'walking', profile = 'safe', origin = 'Current Location', destination = 'Destination' } = useLocalSearchParams<{
    mode: 'walking' | 'cycling' | 'car' | 'transit';
    profile: string;
    origin: string;
    destination: string;
  }>();
  
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  
  // Get routes for the selected mode
  const routes = mockRoutes[mode as keyof typeof mockRoutes] || [];

  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId);
    
    // Navigate to route details after a short delay
    setTimeout(() => {
      router.push({
        pathname: '/route-details',
        params: {
          mode,
          routeId,
        },
      });
    }, 300);
  };

  const handleFilterPress = () => {
    router.push('/filters');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Results</Text>
          <Text style={styles.headerSubtitle}>{origin} → {destination}</Text>
        </View>
        <TouchableOpacity onPress={handleFilterPress} style={styles.filterButton}>
          <Sliders size={24} color={Colors.ui.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.resultsCount}>{routes.length} routes found</Text>
        
        {routes.map((route) => (
          <RouteCard
            key={route.id}
            mode={mode as 'walking' | 'cycling' | 'car' | 'transit'}
            profile={route.profile}
            duration={route.duration}
            distance={route.distance}
            elevation={route.elevation}
            conformity={route.conformity}
            onPress={() => handleRouteSelect(route.id)}
            isSelected={selectedRoute === route.id}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  resultsCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 16,
  },
});