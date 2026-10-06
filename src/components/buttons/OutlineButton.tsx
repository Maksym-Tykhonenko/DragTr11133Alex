import React from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import {colors, fonts, layout} from '../../constants/theme';
import {icons} from '../../data/assets';

type OutlineButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  showShareIcon?: boolean;
};

export function OutlineButton({
  label,
  onPress,
  style,
  showShareIcon = false,
}: OutlineButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.OutlineButtonBtnPortico,
        pressed && styles.OutlineButtonPressedDim,
        style,
      ]}>
      {showShareIcon ? (
        <Image
          source={icons.share}
          style={styles.OutlineButtonIconSigil}
          resizeMode="contain"
        />
      ) : null}
      <Text style={styles.OutlineButtonLabelFiligree}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  OutlineButtonBtnPortico: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    height: layout.cardButtonHeight,
    justifyContent: 'center',
    width: '100%',
  },
  OutlineButtonPressedDim: {
    opacity: 0.85,
  },

  OutlineButtonIconSigil: {
    height: 15,
    tintColor: colors.goldSoft,
    width: 15,
  },
  OutlineButtonLabelFiligree: {
    color: colors.goldSoft,
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
});
