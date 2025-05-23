import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, RotateCcw, Trash2, ArrowRight } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import Colors from '@/constants/Colors';
import { favoritesAndHistory, transportModes } from '@/constants/MockData';

export default function HistoryScreen() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('all');

  const getTransportIcon = (mode: string) => {
    const transportMode = transportModes.find(m => m.id === mode);
    return transportMode?.icon || 'map-pin';
  };

  const getTransportColor = (mode: string) => {
    switch (mode) {
      case 'walking':
        return Colors.transport.walking.primary;
      case 'cycling':
        return Colors.transport.cycling.primary;
      case 'car':
        return Colors.transport.car.primary;
      case 'transit':
        return Colors.transport.transit.primary;
      default:
        return Colors.ui.primary;
    }
  };

  const handleHistoryItemPress = (id: string) => {
    router.push({
      pathname: '/route-results',
      params: { from: 'history', id },
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const renderHistoryItem = (item: typeof favoritesAndHistory.history[0]) => {
    const color = getTransportColor(item.mode);
    
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.historyCard}
        onPress={() => handleHistoryItemPress(item.id)}
      >
        <View style={styles.historyCardContent}>
          <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
            <Text style={[styles.transportIcon, { color }]}>
              {getTransportIcon(item.mode)}
            </Text>
          </View>
          
          <View style={styles.routeInfo}>
            <View style={styles.routeDetail}>
              <Text style={styles.fromToLabel}>From</Text>
              <Text style={styles.locationText}>{item.from}</Text>
            </View>
            
            <View style={styles.arrow}>
              <ArrowRight size={16} color="#ccc" />
            </View>
            
            <View style={styles.routeDetail}>
              <Text style={styles.fromToLabel}>To</Text>
              <Text style={styles.locationText}>{item.to}</Text>
            </View>
          </View>
          
          <View style={styles.historyMeta}>
            <Text style={styles.dateText}>{formatDate(item.date)}</Text>
            <View style={styles.durationContainer}>
              <Clock size={14} color="#666" />
              <Text style={styles.durationText}>{item.duration} min</Text>
            </View>
          </View>
          
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionButton}>
              <RotateCcw size={16} color={Colors.ui.primary} />
              <Text style={styles.actionText}>Repeat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Trash2 size={16} color={Colors.ui.error} />
              <Text style={[styles.actionText, { color: Colors.ui.error }]}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'walking', label: 'Walking' },
    { id: 'cycling', label: 'Cycling' },
    { id: 'car', label: 'Car' },
    { id: 'transit', label: 'Transit' },
  ];

  const filteredHistory = selectedTab === 'all'
    ? favoritesAndHistory.history
    : favoritesAndHistory.history.filter(item => item.mode === selectedTab);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Travel History</Text>
      </View>

      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                selectedTab === tab.id && styles.activeTab,
              ]}
              onPress={() => setSelectedTab(tab.id)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab.id && styles.activeTabText,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.historyContainer}>
          {filteredHistory.length > 0 ? (
            filteredHistory.map(renderHistoryItem)
          ) : (
            <Text style={styles.emptyText}>No history found for this category</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    paddingTop: 24,
    backgroundColor: 'white',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
  },
  tabsContainer: {
    backgroundColor: 'white',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: Colors.ui.primary,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  scrollContent: {
    padding: 16,
  },
  historyContainer: {
    marginBottom: 24,
  },
  historyCard: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  historyCardContent: {
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  transportIcon: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeDetail: {
    flex: 1,
  },
  fromToLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  locationText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  arrow: {
    marginHorizontal: 8,
  },
  historyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 4,
    color: '#666',
  },
  actionsRow: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 4,
    color: Colors.ui.primary,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 24,
  },
});