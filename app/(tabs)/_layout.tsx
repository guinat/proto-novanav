import React from 'react';
import { Tabs } from 'expo-router/tabs';
import { Search, Heart, Map, Settings, MapPin } from 'lucide-react-native';
import { View, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.ui.primary,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Search size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, size }) => (
            <Heart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map-button"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View style={styles.mapButtonContainer}>
              <Map size={24} color="white" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            <MapPin size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  mapButtonContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.ui.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});