import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Footprints, Bike, Car, Brain as Train } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type TransportMode = 'walking' | 'cycling' | 'car' | 'transit';

interface TransportModeSelectorProps {
  selectedMode: TransportMode;
  onModeChange: (mode: TransportMode) => void;
}

export function TransportModeSelector({
  selectedMode,
  onModeChange,
}: TransportModeSelectorProps) {
  const renderIcon = (mode: TransportMode, isSelected: boolean) => {
    const color = isSelected ? 'white' : Colors.transport[mode].primary;
    const size = 28;

    switch (mode) {
      case 'walking':
        return <Footprints size={size} color={color} />;
      case 'cycling':
        return <Bike size={size} color={color} />;
      case 'car':
        return <Car size={size} color={color} />;
      case 'transit':
        return <Train size={size} color={color} />;
      default:
        return null;
    }
  };

  const modes: TransportMode[] = ['walking', 'cycling', 'car', 'transit'];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {modes.map((mode) => {
        const isSelected = mode === selectedMode;
        return (
          <TouchableOpacity
            key={mode}
            style={[
              styles.modeButton,
              isSelected && { backgroundColor: Colors.transport[mode].primary },
            ]}
            onPress={() => onModeChange(mode)}
            activeOpacity={0.7}
          >
            {renderIcon(mode, isSelected)}
            <Text
              style={[
                styles.modeText,
                isSelected && styles.selectedModeText,
              ]}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  modeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    width: 100,
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modeText: {
    marginTop: 8,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  selectedModeText: {
    color: 'white',
  },
});