import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui/Card';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import Slider from '@react-native-community/slider';
import Colors from '@/constants/Colors';

interface FilterToggleProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function FilterToggle({ label, value, onValueChange }: FilterToggleProps) {
  return (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#ccc', true: Colors.ui.primary }}
        thumbColor="white"
      />
    </View>
  );
}

interface ProfileFilterProps {
  mode: 'walking' | 'cycling' | 'car' | 'transit';
}

export function ProfileFilter({ mode }: ProfileFilterProps) {
  const [expanded, setExpanded] = useState(false);
  const [prioritizeTime, setPrioritizeTime] = useState(50);
  const [safetyLevel, setSafetyLevel] = useState(true);
  const [avoidHills, setAvoidHills] = useState(false);
  const [preferPaved, setPreferPaved] = useState(true);
  const [accessibilityMode, setAccessibilityMode] = useState(false);

  const getFiltersByMode = () => {
    switch (mode) {
      case 'walking':
        return (
          <>
            <FilterToggle
              label="Prioritize well-lit paths"
              value={safetyLevel}
              onValueChange={setSafetyLevel}
            />
            <FilterToggle
              label="Avoid hills"
              value={avoidHills}
              onValueChange={setAvoidHills}
            />
            <FilterToggle
              label="Prefer paved paths"
              value={preferPaved}
              onValueChange={setPreferPaved}
            />
            <FilterToggle
              label="Accessibility mode"
              value={accessibilityMode}
              onValueChange={setAccessibilityMode}
            />
          </>
        );
      case 'cycling':
        return (
          <>
            <FilterToggle
              label="Prefer bike lanes"
              value={safetyLevel}
              onValueChange={setSafetyLevel}
            />
            <FilterToggle
              label="Avoid hills"
              value={avoidHills}
              onValueChange={setAvoidHills}
            />
            <FilterToggle
              label="Prefer paved routes"
              value={preferPaved}
              onValueChange={setPreferPaved}
            />
          </>
        );
      case 'car':
        return (
          <>
            <FilterToggle
              label="Avoid tolls"
              value={safetyLevel}
              onValueChange={setSafetyLevel}
            />
            <FilterToggle
              label="Avoid highways"
              value={avoidHills}
              onValueChange={setAvoidHills}
            />
            <FilterToggle
              label="Eco-friendly route"
              value={preferPaved}
              onValueChange={setPreferPaved}
            />
          </>
        );
      case 'transit':
        return (
          <>
            <FilterToggle
              label="Minimize transfers"
              value={safetyLevel}
              onValueChange={setSafetyLevel}
            />
            <FilterToggle
              label="Prefer wheelchair access"
              value={accessibilityMode}
              onValueChange={setAccessibilityMode}
            />
            <FilterToggle
              label="Less walking"
              value={avoidHills}
              onValueChange={setAvoidHills}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.title}>Advanced Filters</Text>
        {expanded ? (
          <ChevronUp size={20} color="#666" />
        ) : (
          <ChevronDown size={20} color="#666" />
        )}
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>
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
              value={prioritizeTime}
              onValueChange={setPrioritizeTime}
              minimumTrackTintColor={Colors.ui.primary}
              maximumTrackTintColor="#ccc"
              thumbTintColor={Colors.ui.primary}
            />
          </View>

          <View style={styles.divider} />
          {getFiltersByMode()}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  content: {
    marginTop: 16,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 8,
  },
  sliderLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderEndLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
  },
  slider: {
    height: 40,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  toggleLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});