import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Map, Search, MapPin, Navigation, ChevronRight } from 'lucide-react-native';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { TransportModeSelector } from '@/components/TransportModeSelector';
import { RouteProfileSelector } from '@/components/RouteProfileSelector';
import { ProfileFilter } from '@/components/ProfileFilter';
import Colors from '@/constants/Colors';
import { transportModes } from '@/constants/MockData';

export default function SearchScreen() {
  const router = useRouter();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [transportMode, setTransportMode] = useState<'walking' | 'cycling' | 'car' | 'transit'>('walking');
  const [selectedProfile, setSelectedProfile] = useState('safe');

  const handleSearch = () => {
    router.push({
      pathname: '/route-results',
      params: {
        mode: transportMode,
        profile: selectedProfile,
        origin: origin || 'Current Location',
        destination: destination || 'Unknown Destination',
      },
    });
  };

  const handleModeChange = (mode: 'walking' | 'cycling' | 'car' | 'transit') => {
    setTransportMode(mode);
    // Set default profile for the selected mode
    const defaultProfile = transportModes.find(m => m.id === mode)?.profiles[0].id || 'safe';
    setSelectedProfile(defaultProfile);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Plan Your Route</Text>
          <TouchableOpacity style={styles.mapButton} onPress={() => router.push('/map')}>
            <Map size={24} color={Colors.ui.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.pointsContainer}>
            <View style={styles.originPoint} />
            <View style={styles.dottedLine} />
            <View style={styles.destinationPoint} />
          </View>
          <View style={styles.inputsContainer}>
            <Input
              placeholder="Current Location"
              value={origin}
              onChangeText={setOrigin}
              leftIcon={<MapPin size={20} color={Colors.transport.walking.primary} />}
              clearable
              onClear={() => setOrigin('')}
              containerStyle={styles.inputContainer}
            />
            <Input
              placeholder="Where to?"
              value={destination}
              onChangeText={setDestination}
              leftIcon={<Navigation size={20} color={Colors.ui.accent} />}
              clearable
              onClear={() => setDestination('')}
              containerStyle={styles.inputContainer}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.recentSearchContainer}
          onPress={() => setDestination('CY Tech')}
        >
          <View style={styles.recentSearchIcon}>
            <MapPin size={20} color="#666" />
          </View>
          <View style={styles.recentSearchTextContainer}>
            <Text style={styles.recentSearchPrimary}>CY Tech</Text>
            <Text style={styles.recentSearchSecondary}>Cergy, 95000</Text>
          </View>
          <ChevronRight size={16} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.recentSearchContainer}
          onPress={() => setDestination('Brooklyn Bridge')}
        >
          <View style={styles.recentSearchIcon}>
            <MapPin size={20} color="#666" />
          </View>
          <View style={styles.recentSearchTextContainer}>
            <Text style={styles.recentSearchPrimary}>Brooklyn Bridge</Text>
            <Text style={styles.recentSearchSecondary}>Brooklyn, NY</Text>
          </View>
          <ChevronRight size={16} color="#999" />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Transport Mode</Text>
        <TransportModeSelector
          selectedMode={transportMode}
          onModeChange={handleModeChange}
        />

        <RouteProfileSelector
          mode={transportMode}
          selectedProfile={selectedProfile}
          onProfileChange={setSelectedProfile}
        />

        <ProfileFilter mode={transportMode} />

        <Button
          title="Search Routes"
          onPress={handleSearch}
          icon={<Search size={20} color="white" />}
          style={styles.searchButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
  },
  mapButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.ui.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  pointsContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 8,
    paddingTop: 12,
  },
  originPoint: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.transport.walking.primary,
    marginBottom: 4,
  },
  dottedLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#ccc',
    marginVertical: 4,
  },
  destinationPoint: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.ui.accent,
    marginTop: 4,
  },
  inputsContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 8,
  },
  recentSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  recentSearchIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentSearchTextContainer: {
    flex: 1,
  },
  recentSearchPrimary: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  recentSearchSecondary: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  searchButton: {
    marginTop: 16,
    marginBottom: 32,
  },
});