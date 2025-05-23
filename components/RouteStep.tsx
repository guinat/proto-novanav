import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface RouteStepProps {
  number: number;
  instruction: string;
  distance: number;
  duration: number;
  isLast?: boolean;
}

export function RouteStep({
  number,
  instruction,
  distance,
  duration,
  isLast = false,
}: RouteStepProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stepNumberContainer}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>{number}</Text>
        </View>
        {!isLast && <View style={styles.verticalLine} />}
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.instruction}>{instruction}</Text>
        <View style={styles.detailsContainer}>
          {distance > 0 && (
            <Text style={styles.detail}>{distance.toFixed(1)} km</Text>
          )}
          {duration > 0 && (
            <Text style={styles.detail}>{duration} min</Text>
          )}
        </View>
        {!isLast && <View style={styles.divider} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  stepNumberContainer: {
    alignItems: 'center',
    width: 40,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 4,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  instruction: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
  },
  detail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginTop: 12,
  },
});