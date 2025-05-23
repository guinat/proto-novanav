import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, X } from 'lucide-react-native';
import Slider from '@react-native-community/slider';
import { Button } from '@/components/ui/Button';
import Colors from '@/constants/Colors';

type FilterSetting = {
  label: string;
  value: boolean;
};

type ModeFilters = {
  [key: string]: FilterSetting[];
};

export default function FiltersScreen() {
  const router = useRouter();
  const { mode = 'walking' } = useLocalSearchParams<{
    mode: 'walking' | 'cycling' | 'car' | 'transit';
  }>();
  
  const [timeVsDistance, setTimeVsDistance] = useState(50);
  
  // Default filters based on transport mode
  const defaultFilters: ModeFilters = {
    walking: [
      { label: 'Avoid hills', value: false },
      { label: 'Prefer well-lit paths', value: true },
      { label: 'Prefer quieter streets', value: true },
      { label: 'Avoid stairs', value: false },
      { label: 'Accessible routes', value: false },
    ],
    cycling: [
      { label: 'Prefer bike lanes', value: true },
      { label: 'Avoid traffic', value: true },
      { label: 'Prefer paved roads', value: true },
      { label: 'Include elevation training', value: false },
      { label: 'Avoid hills', value: false },
    ],
    car: [
      { label: 'Avoid tolls', value: false },
      { label: 'Avoid highways', value: false },
      { label: 'Prefer scenic routes', value: false },
      { label: 'Eco-friendly route', value: true },
      { label: 'Avoid traffic', value: true },
    ],
    transit: [
      { label: 'Fewer transfers', value: true },
      { label: 'Less walking', value: false },
      { label: 'Prefer trains over buses', value: false },
      { label: 'Wheelchair accessible', value: false },
      { label: 'Real-time departures', value: true },
    ],
  };
  
  const [filters, setFilters] = useState<ModeFilters>(defaultFilters);

  const toggleFilter = (filterIndex: number) => {
    const modeFilters = [...filters[mode]];
    modeFilters[filterIndex] = {
      ...modeFilters[filterIndex],
      value: !modeFilters[filterIndex].value,
    };
    
    setFilters({
      ...filters,
      [mode]: modeFilters,
    });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setTimeVsDistance(50);
  };

  const applyFilters = () => {
    // Here we would normally save these filters and apply them
    // For this prototype, we just go back
    router.back();
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
        <Text style={styles.headerTitle}>Advanced Filters</Text>
        <TouchableOpacity onPress={resetFilters} style={styles.resetButton}>
          <X size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Route Preferences</Text>
          
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>
              Prioritize: Time vs. Distance
            </Text>
            <View style={styles.sliderLabelsContainer}>
              <Text style={styles.sliderEndLabel}>Time</Text>
              <Text style={styles.sliderEndLabel}>Distance</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={timeVsDistance}
              onValueChange={setTimeVsDistance}
              minimumTrackTintColor={getModeColor()}
              maximumTrackTintColor="#ccc"
              thumbTintColor={getModeColor()}
            />
          </View>
          
          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              Slide to adjust your preference between the fastest route (less time) or the shortest route (less distance).
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {mode.charAt(0).toUpperCase() + mode.slice(1)} Options
          </Text>
          
          {filters[mode].map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={styles.filterItem}
              onPress={() => toggleFilter(index)}
            >
              <Text style={styles.filterLabel}>{filter.label}</Text>
              <View
                style={[
                  styles.toggleButton,
                  filter.value && { backgroundColor: getModeColor() },
                ]}
              >
                <View
                  style={[
                    styles.toggleCircle,
                    filter.value && { transform: [{ translateX: 20 }] },
                  ]}
                />
              </View>
            </TouchableOpacity>
          ))}
          
          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              Select your preferences for {mode} routes. These settings will be saved for future searches.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Apply Filters"
          onPress={applyFilters}
          color={getModeColor()}
          style={styles.applyButton}
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
  resetButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 8,
  },
  sliderLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderEndLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  slider: {
    height: 40,
  },
  description: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  descriptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  filterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  toggleButton: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    padding: 4,
  },
  toggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'white',
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  applyButton: {
    width: '100%',
  },
});