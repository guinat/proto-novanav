import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  elevation?: number;
}

export function Card({ children, style, elevation = 2 }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        {
          elevation,
          shadowOpacity: elevation * 0.05,
          shadowRadius: elevation * 0.7,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
  },
});