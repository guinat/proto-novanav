import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Clock, Navigation, ArrowUp, CircleCheck as CheckCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface RouteCardProps {
  mode: 'walking' | 'cycling' | 'car' | 'transit';
  profile: string;
  duration: number;
  distance: number;
  elevation?: number;
  conformity: number;
  onPress: () => void;
  isSelected?: boolean;
}

export function RouteCard({
  mode,
  profile,
  duration,
  distance,
  elevation,
  conformity,
  onPress,
  isSelected = false,
}: RouteCardProps) {
  const getModeColor = () => {
    return Colors.transport[mode].primary;
  };

  const getProfileName = () => {
    const capitalizedProfile = profile.charAt(0).toUpperCase() + profile.slice(1);
    return `${capitalizedProfile} Route`;
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card
        style={[
          styles.container,
          isSelected && { borderWidth: 2, borderColor: getModeColor() },
        ]}
      >
        <View style={styles.header}>
          <View style={[styles.profileBadge, { backgroundColor: getModeColor() }]}>
            <Text style={styles.profileText}>{getProfileName()}</Text>
          </View>
          {isSelected && (
            <CheckCircle size={20} color={getModeColor()} style={styles.selectedIcon} />
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.metric}>
            <Clock size={20} color={getModeColor()} />
            <Text style={styles.metricValue}>{duration} min</Text>
          </View>
          
          <View style={styles.metric}>
            <Navigation size={20} color={getModeColor()} />
            <Text style={styles.metricValue}>{distance.toFixed(1)} km</Text>
          </View>
          
          {elevation !== undefined && elevation > 0 && (
            <View style={styles.metric}>
              <ArrowUp size={20} color={getModeColor()} />
              <Text style={styles.metricValue}>{elevation} m</Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.conformityContainer}>
            <Text style={styles.conformityLabel}>Route Score</Text>
            <Text style={[styles.conformityValue, { color: getModeColor() }]}>
              {conformity.toFixed(1)}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  profileText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  selectedIcon: {
    marginLeft: 8,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricValue: {
    marginLeft: 6,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  conformityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conformityLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  conformityValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
});