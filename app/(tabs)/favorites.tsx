import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, Clock, Trash2, Navigation, ChevronRight } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import Colors from '@/constants/Colors';
import { favoritesAndHistory } from '@/constants/MockData';
import { LocationImages } from '@/constants/ProfileImages';

export default function FavoritesScreen() {
  const router = useRouter();

  const handleFavoritePress = (id: string) => {
    // Navigate to route details
    router.push({
      pathname: '/route-results',
      params: { from: 'favorites', id },
    });
  };

  const renderFavoriteItem = (item: typeof favoritesAndHistory.favorites[0], index: number) => {
    const imageUrl = LocationImages.destinations[index % LocationImages.destinations.length];

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.favoriteCard}
        onPress={() => handleFavoritePress(item.id)}
      >
        <Image source={{ uri: imageUrl }} style={styles.favoriteImage} />
        <View style={styles.favoriteOverlay} />
        <View style={styles.favoriteContent}>
          <View style={styles.favoriteHeader}>
            <Text style={styles.favoriteName}>{item.name}</Text>
            <Heart size={20} color="#FF4081" fill="#FF4081" />
          </View>
          <Text style={styles.favoriteAddress}>{item.address}</Text>
          <View style={styles.favoriteActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Navigation size={16} color={Colors.ui.primary} />
              <Text style={styles.actionText}>Navigate</Text>
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Places</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.favoritesContainer}>
          {favoritesAndHistory.favorites.map(renderFavoriteItem)}
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New Place</Text>
        </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
  },
  scrollContent: {
    padding: 16,
  },
  favoritesContainer: {
    marginBottom: 24,
  },
  favoriteCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    height: 180,
  },
  favoriteImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  favoriteOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  favoriteContent: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  favoriteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favoriteName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  favoriteAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'white',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  favoriteActions: {
    flexDirection: 'row',
    marginTop: 'auto',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 4,
    color: Colors.ui.primary,
  },
  addButton: {
    backgroundColor: Colors.ui.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  addButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'white',
  },
});