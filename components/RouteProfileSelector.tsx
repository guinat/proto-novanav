import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Heart, Zap, Mountain, Timer } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { transportModes } from '@/constants/MockData';

interface RouteProfileSelectorProps {
  mode: 'walking' | 'cycling' | 'car' | 'transit';
  selectedProfile: string;
  onProfileChange: (profile: string) => void;
}

export function RouteProfileSelector({
  mode,
  selectedProfile,
  onProfileChange,
}: RouteProfileSelectorProps) {
  const profiles = transportModes.find((m) => m.id === mode)?.profiles || [];

  const renderIcon = (profileId: string) => {
    const size = 20;
    const color = Colors.profile[profileId as keyof typeof Colors.profile] || Colors.ui.primary;

    switch (profileId) {
      case 'safe':
        return <Heart size={size} color={color} />;
      case 'sport':
      case 'fast':
        return <Zap size={size} color={color} />;
      case 'scenic':
        return <Mountain size={size} color={color} />;
      default:
        return <Timer size={size} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Route Profile</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {profiles.map((profile) => {
          const isSelected = profile.id === selectedProfile;
          const profileColor = Colors.profile[profile.id as keyof typeof Colors.profile] || Colors.ui.primary;
          
          return (
            <TouchableOpacity
              key={profile.id}
              style={[
                styles.profileButton,
                isSelected && { borderColor: profileColor, borderWidth: 2 },
              ]}
              onPress={() => onProfileChange(profile.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: profileColor }]}>
                {renderIcon(profile.id)}
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.profileName}>{profile.name}</Text>
                <Text style={styles.profileDescription} numberOfLines={2}>
                  {profile.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  scrollContainer: {
    paddingHorizontal: 8,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 8,
    width: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  profileDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});