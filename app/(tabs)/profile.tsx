import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { LogOut, ChevronRight, Moon, MapPin, Bell, CircleHelp as HelpCircle, Shield, Compass } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import { ProfileImages } from '@/constants/ProfileImages';
import { userPreferences, transportModes } from '@/constants/MockData';

export default function ProfileScreen() {
  const router = useRouter();
  const [preferences, setPreferences] = useState(userPreferences);
  const [isDarkMode, setIsDarkMode] = useState(preferences.theme === 'dark');
  const [units, setUnits] = useState<'km' | 'miles'>(preferences.units as 'km' | 'miles');

  const handleLogout = () => {
    // Navigate to auth screen
    router.replace('/login');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    setPreferences({
      ...preferences,
      theme: isDarkMode ? 'light' : 'dark',
    });
  };

  const toggleUnits = () => {
    const newUnits = units === 'km' ? 'miles' : 'km';
    setUnits(newUnits);
    setPreferences({
      ...preferences,
      units: newUnits,
    });
  };

  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    subtitle?: string,
    rightElement?: React.ReactNode,
    onPress?: () => void,
  ) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIconContainer}>{icon}</View>
      <View style={styles.settingTextContainer}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement || <ChevronRight size={20} color="#ccc" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: ProfileImages.user }} style={styles.profileImage} />
          <Text style={styles.profileName}>Sarah Johnson</Text>
          <Text style={styles.profileEmail}>sarah.johnson@example.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          {renderSettingItem(
            <Compass size={24} color={Colors.ui.primary} />,
            'Default Transport Mode',
            transportModes.find(m => m.id === preferences.defaultMode)?.name,
          )}
          
          {renderSettingItem(
            <Moon size={24} color={Colors.ui.primary} />,
            'Dark Mode',
            'Change app appearance',
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#ccc', true: Colors.ui.primary }}
              thumbColor="white"
            />
          )}
          
          {renderSettingItem(
            <MapPin size={24} color={Colors.ui.primary} />,
            'Distance Units',
            units === 'km' ? 'Kilometers' : 'Miles',
            <Switch
              value={units === 'miles'}
              onValueChange={toggleUnits}
              trackColor={{ false: '#ccc', true: Colors.ui.primary }}
              thumbColor="white"
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          {renderSettingItem(
            <Shield size={24} color={Colors.ui.primary} />,
            'Privacy Settings',
            'Manage your data and privacy',
          )}
          
          {renderSettingItem(
            <Bell size={24} color={Colors.ui.primary} />,
            'Notifications',
            'Configure app notifications',
          )}
          
          {renderSettingItem(
            <HelpCircle size={24} color={Colors.ui.primary} />,
            'Help & Support',
            'FAQs and contact information',
          )}
        </View>

        <Button
          title="Sign Out"
          onPress={handleLogout}
          variant="outlined"
          color={Colors.ui.error}
          icon={<LogOut size={20} color={Colors.ui.error} />}
          style={styles.logoutButton}
        />

        <Text style={styles.versionText}>RouteQuest v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  settingSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    marginBottom: 24,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
  },
});