import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { ChevronLeft, Volume2, VolumeX, RotateCw, ChevronDown, MapPin } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import Colors from '@/constants/Colors';
import { mockRoutes, mapCoordinates } from '@/constants/MockData';

export default function MapScreen() {
  const router = useRouter();
  const { mode = 'walking', routeId, navigate } = useLocalSearchParams<{
    mode: 'walking' | 'cycling' | 'car' | 'transit';
    routeId?: string;
    navigate?: string;
  }>();
  
  const mapRef = useRef<MapView>(null);
  const [voiceGuidance, setVoiceGuidance] = useState(navigate === 'true');
  const [infoExpanded, setInfoExpanded] = useState(true);
  const [activeLeg, setActiveLeg] = useState(0);

  // Find the selected route if routeId is provided
  const routes = mockRoutes[mode as keyof typeof mockRoutes] || [];
  const route = routeId ? routes.find((r) => r.id === routeId) : null;
  
  const currentStep = route?.steps[activeLeg];

  const getModeColor = () => {
    return Colors.transport[mode as keyof typeof Colors.transport].primary;
  };

  const toggleVoiceGuidance = () => {
    setVoiceGuidance(!voiceGuidance);
  };

  const recenterMap = () => {
    mapRef.current?.animateToRegion({
      latitude: mapCoordinates.userLocation.latitude,
      longitude: mapCoordinates.userLocation.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const toggleInfo = () => {
    setInfoExpanded(!infoExpanded);
  };

  const goToNextLeg = () => {
    if (route && activeLeg < route.steps.length - 1) {
      setActiveLeg(activeLeg + 1);
    }
  };

  const goToPreviousLeg = () => {
    if (activeLeg > 0) {
      setActiveLeg(activeLeg - 1);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={{
          latitude: mapCoordinates.userLocation.latitude,
          longitude: mapCoordinates.userLocation.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass
        showsScale
      >
        <Marker
          coordinate={mapCoordinates.userLocation}
          title="Your Location"
          pinColor={getModeColor()}
        />
        
        <Marker
          coordinate={mapCoordinates.destination}
          title="Destination"
        />
        
        <Polyline
          coordinates={mapCoordinates.route}
          strokeWidth={4}
          strokeColor={getModeColor()}
        />
      </MapView>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ChevronLeft size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.recenterButton}
        onPress={recenterMap}
      >
        <RotateCw size={20} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.voiceButton}
        onPress={toggleVoiceGuidance}
      >
        {voiceGuidance ? (
          <Volume2 size={20} color={getModeColor()} />
        ) : (
          <VolumeX size={20} color="#999" />
        )}
      </TouchableOpacity>

      {route && (
        <View style={[styles.bottomSheet, !infoExpanded && styles.bottomSheetCollapsed]}>
          <TouchableOpacity
            style={styles.bottomSheetHandle}
            onPress={toggleInfo}
          >
            <View style={styles.handle} />
            <ChevronDown size={24} color="#999" />
          </TouchableOpacity>
          
          {infoExpanded && (
            <View style={styles.navigationInfo}>
              <View style={styles.stepIndicator}>
                <Text style={styles.stepText}>Step {activeLeg + 1} of {route.steps.length}</Text>
              </View>
              
              <Text style={styles.instructionText}>{currentStep?.instruction}</Text>
              
              <View style={styles.metrics}>
                <View style={styles.metric}>
                  <Text style={styles.metricValue}>{currentStep?.distance.toFixed(1)} km</Text>
                  <Text style={styles.metricLabel}>Distance</Text>
                </View>
                
                <View style={styles.metricDivider} />
                
                <View style={styles.metric}>
                  <Text style={styles.metricValue}>{currentStep?.duration} min</Text>
                  <Text style={styles.metricLabel}>Duration</Text>
                </View>
              </View>
              
              <View style={styles.navigationControls}>
                <TouchableOpacity
                  style={[styles.navButton, activeLeg === 0 && styles.navButtonDisabled]}
                  onPress={goToPreviousLeg}
                  disabled={activeLeg === 0}
                >
                  <Text style={styles.navButtonText}>Previous</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.navButton,
                    activeLeg === route.steps.length - 1 && styles.navButtonDisabled,
                  ]}
                  onPress={goToNextLeg}
                  disabled={activeLeg === route.steps.length - 1}
                >
                  <Text style={styles.navButtonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  recenterButton: {
    position: 'absolute',
    top: 48,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  voiceButton: {
    position: 'absolute',
    top: 100,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSheetCollapsed: {
    height: 60,
  },
  bottomSheetHandle: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ddd',
    marginBottom: 8,
  },
  navigationInfo: {
    padding: 16,
  },
  stepIndicator: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  stepText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#666',
  },
  instructionText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginBottom: 16,
  },
  metrics: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metric: {
    flex: 1,
    alignItems: 'center',
  },
  metricValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  metricLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  metricDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#eee',
  },
  navigationControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: Colors.ui.primary,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#ccc',
  },
  navButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'white',
  },
});