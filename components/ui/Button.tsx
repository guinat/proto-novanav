import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Colors from '@/constants/Colors';

type ButtonVariant = 'filled' | 'outlined' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  color?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'filled',
  size = 'medium',
  disabled = false,
  loading = false,
  color = Colors.ui.primary,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const getButtonStyle = () => {
    let buttonStyle: ViewStyle = { ...styles.button };

    // Size
    if (size === 'small') {
      buttonStyle = { ...buttonStyle, ...styles.buttonSmall };
    } else if (size === 'large') {
      buttonStyle = { ...buttonStyle, ...styles.buttonLarge };
    }

    // Variant
    if (variant === 'filled') {
      buttonStyle = { ...buttonStyle, backgroundColor: color };
    } else if (variant === 'outlined') {
      buttonStyle = {
        ...buttonStyle,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: color,
      };
    } else if (variant === 'text') {
      buttonStyle = {
        ...buttonStyle,
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
      };
    }

    // Disabled
    if (disabled) {
      buttonStyle = {
        ...buttonStyle,
        opacity: 0.5,
      };
    }

    return buttonStyle;
  };

  const getTextStyle = () => {
    let textStyleBase: TextStyle = { ...styles.buttonText };

    // Size
    if (size === 'small') {
      textStyleBase = { ...textStyleBase, ...styles.buttonTextSmall };
    } else if (size === 'large') {
      textStyleBase = { ...textStyleBase, ...styles.buttonTextLarge };
    }

    // Variant
    if (variant === 'outlined' || variant === 'text') {
      textStyleBase = { ...textStyleBase, color };
    }

    return textStyleBase;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'filled' ? 'white' : color}
          size="small"
        />
      ) : (
        <>
          {icon && icon}
          <Text style={[getTextStyle(), textStyle, icon ? { marginLeft: 8 } : null]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonLarge: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  buttonTextSmall: {
    fontSize: 14,
  },
  buttonTextLarge: {
    fontSize: 18,
  },
});