const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  // Transport mode colors
  transport: {
    walking: {
      primary: '#4CAF50',
      secondary: '#81C784',
      light: '#E8F5E9',
    },
    cycling: {
      primary: '#FF9800',
      secondary: '#FFB74D',
      light: '#FFF3E0',
    },
    car: {
      primary: '#2196F3',
      secondary: '#64B5F6',
      light: '#E3F2FD',
    },
    transit: {
      primary: '#9C27B0',
      secondary: '#BA68C8',
      light: '#F3E5F5',
    },
  },
  // Profile colors
  profile: {
    safe: '#4CAF50',
    sport: '#F44336',
    fast: '#2196F3',
    scenic: '#FF9800',
    accessible: '#9C27B0',
  },
  // UI colors
  ui: {
    primary: '#1976D2',
    secondary: '#03A9F4',
    accent: '#FF5722',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    divider: '#E0E0E0',
    cardBackground: '#FFFFFF',
    inputBackground: '#F5F5F5',
  },
};