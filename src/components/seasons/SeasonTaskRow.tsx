import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import {colors, fonts, layout} from '../../constants/theme';
import {icons} from '../../data/assets';

type SeasonTaskRowProps = {
  label: string;
  checked: boolean;
  isLast?: boolean;
  onToggle: () => void;
};

export function SeasonTaskRow({
  label,
  checked,
  isLast = false,
  onToggle,
}: SeasonTaskRowProps) {
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{checked}}
      style={[
        styles.SeasonTaskRowFacetChassis,
        !isLast && styles.SeasonTaskRowBorder,
      ]}>
      <View
        style={[
          styles.SeasonTaskRowCheckbox,
          checked && styles.SeasonTaskRowCheckboxChecked,
        ]}>
        {checked ? (
          <Image
            source={icons.check}
            style={styles.SeasonTaskRowCheckSigil}
            resizeMode="contain"
          />
        ) : null}
      </View>
      <Text
        style={[
          styles.SeasonTaskRowLabelFiligree,
          checked && styles.SeasonTaskRowLabelChecked,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  SeasonTaskRowFacetChassis: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 13,
    width: '100%',
  },

  SeasonTaskRowBorder: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  SeasonTaskRowCheckbox: {
    alignItems: 'center',
    borderColor: colors.goldMuted,
    borderRadius: 5,
    borderWidth: 1,
    height: layout.checkboxSize,
    justifyContent: 'center',
    width: layout.checkboxSize,
  },

  SeasonTaskRowCheckboxChecked: {
    backgroundColor: colors.goldMuted,
    borderWidth: 0,
  },
  SeasonTaskRowCheckSigil: {
    height: 13,
    width: 13,
  },

  SeasonTaskRowLabelFiligree: {
    color: colors.cream,
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 19.6,
  },

  SeasonTaskRowLabelChecked: {
    color: colors.checked,
    textDecorationLine: 'line-through',
  },
});
