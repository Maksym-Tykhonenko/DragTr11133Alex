import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import {colors, fonts, layout} from '../../constants/theme';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  compact?: boolean;
  disabled?: boolean;
};

export function PrimaryButton({
  label,
  onPress,
  style,
  compact = false,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.PrimaryButtonBtnPortico,
        compact && styles.PrimaryButtonBtnCompact,
        pressed && !disabled && styles.PrimaryButtonPressedDim,
        disabled && styles.PrimaryButtonDisabledDim,
        style,
      ]}>
      <Text
        style={[
          styles.PrimaryButtonLabelFiligree,
          compact && styles.PrimaryButtonLabelCompact,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  PrimaryButtonBtnPortico: {
    alignItems: 'center',
    backgroundColor: colors.gold,
    borderRadius: 10,
    height: layout.buttonHeight,
    justifyContent: 'center',
    width: '100%',
  },

  PrimaryButtonBtnCompact: {
    borderRadius: 8,
    height: layout.cardButtonHeight,
  },

  PrimaryButtonPressedDim: {
    opacity: 0.85,
  },
  PrimaryButtonDisabledDim: {
    opacity: 0.45,
  },

  PrimaryButtonLabelFiligree: {
    color: colors.buttonText,
    fontFamily: fonts.sansSemiBold,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.6,
  },
  PrimaryButtonLabelCompact: {
    fontSize: 13,
    letterSpacing: 0.52,
  },
});
