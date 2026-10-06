import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {colors, fonts, layout} from '../../constants/theme';

type AnswerOptionProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function AnswerOption({label, selected, onPress}: AnswerOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{selected}}
      style={[
        styles.AnswerOptionFacetChassis,
        selected && styles.AnswerOptionSelected,
      ]}>
      <View
        style={[
          styles.AnswerOptionRadio,
          selected && styles.AnswerOptionRadioSelected,
        ]}
      />
      <Text
        style={[
          styles.AnswerOptionLabelFiligree,
          selected && styles.AnswerOptionLabelSelected,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  AnswerOptionFacetChassis: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
    width: '100%',
  },

  AnswerOptionSelected: {
    backgroundColor: colors.emberDeep,
    borderColor: colors.danger,
  },

  AnswerOptionRadio: {
    borderColor: colors.radioIdle,
    borderRadius: layout.radioSize / 2,
    borderWidth: 1,
    height: layout.radioSize,
    width: layout.radioSize,
  },

  AnswerOptionRadioSelected: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
    borderWidth: 5,
  },

  AnswerOptionLabelFiligree: {
    color: colors.body,
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
  },
  AnswerOptionLabelSelected: {
    color: colors.cream,
    fontFamily: fonts.sansMedium,
    fontWeight: '500',
  },
});
