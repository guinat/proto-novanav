import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Volume2, VolumeX, Map as MapIcon, Clock, Navigation, Mountain } from 'lucide-react-native';
import { RouteStep } from '@/components/RouteStep';
import { ElevationProfile } from '@/components/ElevationProfile';
import { Button } from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import { mockRoutes } from '@/constants/MockData';

export default function RouteDetailsScreen() {
  const router = useRouter();
  const { mode = 'walking', routeId } = useLocalSearchParams<{
    mode: 'walking' | 'cycling' | 'car' | 'transit';
    routeId: string;
  }>();
  
  const [voiceGuidance, setVoiceGuidance] = useState(false);
  const [activeTab, setActiveTab] = useState('steps');
  
  // Find the selected route
  const routes = mockRoutes[mode as keyof typeof mockRoutes] || [];
  const route = routes.find((r) => r.id === routeId);

  if (!route) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Route not found</Text>
          <Button title="Go Back" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  const handleStartNavigation = () => {
    router.push({
      pathname: '/map',
      params: {
        mode,
        routeId,
        navigate: 'true',
      },
    });
  };

  const toggleVoiceGuidance = () => {
    setVoiceGuidance(!voiceGuidance);
  };

  const getModeColor = () => {
    return Colors.transport[mode as keyof typeof Colors.transport].primary;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Route Details</Text>
        <TouchableOpacity onPress={() => router.push('/map')} style={styles.mapButton}>
          <MapIcon size={24} color={Colors.ui.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.routeSummary}>
        <View style={styles.metricItem}>
          <Clock size={20} color={getModeColor()} />
          <Text style={styles.metricValue}>{route.duration} min</Text>
        </View>
        
        <View style={styles.metricDivider} />
        
        <View style={styles.metricItem}>
          <Navigation size={20} color={getModeColor()} />
          <Text style={styles.metricValue}>{route.distance.toFixed(1)} km</Text>
        </View>
        
        {route.elevation > 0 && (
          <>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Mountain size={20} color={getModeColor()} />
              <Text style={styles.metricValue}>{route.elevation} m</Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'steps' && styles.activeTab]}
          onPress={() => setActiveTab('steps')}
        >
          <Text style={[styles.tabText, activeTab === 'steps' && styles.activeTabText]}>
            Step by Step
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'elevation' && styles.activeTab]}
          onPress={() => setActiveTab('elevation')}
        >
          <Text style={[styles.tabText, activeTab === 'elevation' && styles.activeTabText]}>
            Elevation
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === 'steps' ? (
          <View style={styles.stepsContainer}>
            {route.steps.map((step, index) => (
              <RouteStep
                key={step.id}
                number={index + 1}
                instruction={step.instruction}
                distance={step.distance}
                duration={step.duration}
                isLast={index === route.steps.length - 1}
              />
            ))}
          </View>
        ) : (
          <View style={styles.elevationContainer}>
            <ElevationProfile
              data={route.elevationProfile}
              color={getModeColor()}
            />
            <Text style={styles.elevationDescription}>
              This route has a total elevation gain of {route.elevation} meters.
              The steepest part occurs around the middle of your journey, with a
              gradual descent towards the end.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.voiceButton}
          onPress={toggleVoiceGuidance}
        >
          {voiceGuidance ? (
            <Volume2 size={24} color={getModeColor()} />
          ) : (
            <VolumeX size={24} color="#999" />
          )}
        </TouchableOpacity>
        
        <Button
          title="Start Navigation"
          onPress={handleStartNavigation}
          style={styles.navigationButton}
          color={getModeColor()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    marginBottom: 16,
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
  headerTitle: {
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
  mapButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginLeft: 6,
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.ui.primary,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: Colors.ui.primary,
  },
  content: {
    padding: 16,
  },
  stepsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  elevationContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  elevationDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 16,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  voiceButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  navigationButton: {
    flex: 1,
  },
});