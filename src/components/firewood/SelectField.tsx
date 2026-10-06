import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {colors, fonts} from '../../constants/theme';
import {icons} from '../../data/assets';

type SelectOption = {
  id: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  placeholder: string;
  options: SelectOption[];
  valueId?: string;
  open: boolean;
  onToggle: () => void;
  onSelect: (id: string) => void;
};

export function SelectField({
  label,
  placeholder,
  options,
  valueId,
  open,
  onToggle,
  onSelect,
}: SelectFieldProps) {
  const selected = options.find(option => option.id === valueId);
  const hasValue = Boolean(selected);

  return (
    <View style={[styles.SelectFieldEnclave, open && styles.SelectFieldRaised]}>
      <Text style={styles.SelectFieldLabelFiligree}>{label}</Text>
      <Pressable
        onPress={onToggle}
        style={[
          styles.SelectFieldTriggerPortico,
          (open || hasValue) && styles.SelectFieldTriggerActive,
        ]}
        accessibilityRole="button"
        accessibilityState={{expanded: open}}>
        <Text
          style={[
            styles.SelectFieldValueFiligree,
            !hasValue && styles.SelectFieldPlaceholderFiligree,
          ]}
          numberOfLines={1}>
          {selected?.label ?? placeholder}
        </Text>
        <Image
          source={icons.chevron}
          style={[
            styles.SelectFieldChevronSigil,
            open && styles.SelectFieldChevronOpen,
          ]}
          resizeMode="contain"
        />
      </Pressable>

      {open ? (
        <View style={styles.SelectFieldMenuChassis}>
          {options.map((option, index) => {
            const isLast = index === options.length - 1;
            return (
              <Pressable
                key={option.id}
                onPress={() => onSelect(option.id)}
                style={[
                  styles.SelectFieldMenuItem,
                  !isLast && styles.SelectFieldMenuItemBorder,
                ]}>
                <Text style={styles.SelectFieldMenuItemFiligree}>
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  SelectFieldEnclave: {
    width: '100%',
    zIndex: 1,
  },

  SelectFieldRaised: {
    zIndex: 20,
  },

  SelectFieldLabelFiligree: {
    color: colors.body,
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.96,
    lineHeight: 18,
    textTransform: 'uppercase',
  },

  SelectFieldTriggerPortico: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 13,
    width: '100%',
  },

  SelectFieldTriggerActive: {
    borderColor: colors.goldMuted,
  },
  SelectFieldValueFiligree: {
    color: colors.cream,
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
    marginRight: 8,
  },

  SelectFieldPlaceholderFiligree: {
    color: colors.checked,
  },

  SelectFieldChevronSigil: {
    height: 16,
    tintColor: colors.goldSoft,
    width: 16,
  },

  SelectFieldChevronOpen: {
    transform: [{rotate: '180deg'}],
  },

  SelectFieldMenuChassis: {
    backgroundColor: colors.border,
    borderColor: colors.goldMuted,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 8,
    overflow: 'hidden',
    width: '100%',
  },
  SelectFieldMenuItem: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    width: '100%',
  },

  SelectFieldMenuItemBorder: {
    borderBottomColor: colors.card,
    borderBottomWidth: 1,
  },

  SelectFieldMenuItemFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
  },
});
