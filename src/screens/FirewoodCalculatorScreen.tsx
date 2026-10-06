import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {SelectField} from '../components/firewood/SelectField';
import {colors, fonts, fontSize, spacing} from '../constants/theme';
import {
  FIREWOOD_COPY,
  FIREWOOD_FIREPLACES,
  FIREWOOD_SEASONS,
  FIREWOOD_TEMPERATURES,
  calculateFirewood,
  parseRoomArea,
  type FirewoodFireplaceId,
  type FirewoodSeasonId,
  type FirewoodTemperatureId,
} from '../data/firewood';
import type {FirewoodStackParamList} from '../navigation/types';
import {storageKeys} from '../storage/keys';
import {usePersistedState} from '../storage/usePersistedState';

type Props = NativeStackScreenProps<FirewoodStackParamList, 'FirewoodForm'>;

type OpenSelect = 'season' | 'fireplace' | 'temperature' | null;

type FirewoodFormPersisted = {
  areaText: string;
  seasonId?: FirewoodSeasonId;
  fireplaceId?: FirewoodFireplaceId;
  temperatureId?: FirewoodTemperatureId;
};

const DEFAULT_FIREWOOD_FORM: FirewoodFormPersisted = {
  areaText: '',
};

export function FirewoodCalculatorScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const [form, setForm] = usePersistedState<FirewoodFormPersisted>(
    storageKeys.firewoodForm,
    DEFAULT_FIREWOOD_FORM,
  );
  const [openSelect, setOpenSelect] = useState<OpenSelect>(null);

  const {areaText, seasonId, fireplaceId, temperatureId} = form;
  const setAreaText = (next: string) =>
    setForm(prev => ({...prev, areaText: next}));
  const setSeasonId = (next: FirewoodSeasonId) =>
    setForm(prev => ({...prev, seasonId: next}));
  const setFireplaceId = (next: FirewoodFireplaceId) =>
    setForm(prev => ({...prev, fireplaceId: next}));
  const setTemperatureId = (next: FirewoodTemperatureId) =>
    setForm(prev => ({...prev, temperatureId: next}));

  const area = parseRoomArea(areaText);
  const canCalculate = Boolean(
    area !== null && seasonId && fireplaceId && temperatureId,
  );

  const toggleSelect = (key: Exclude<OpenSelect, null>) => {
    setOpenSelect(current => (current === key ? null : key));
  };

  const handleCalculate = () => {
    if (
      area === null ||
      !seasonId ||
      !fireplaceId ||
      !temperatureId
    ) {
      return;
    }

    const estimate = calculateFirewood({
      area,
      seasonId,
      fireplaceId,
      temperatureId,
    });

    setOpenSelect(null);
    setForm(DEFAULT_FIREWOOD_FORM);
    navigation.navigate('FirewoodResult', {estimate});
  };

  return (
    <View
      style={[styles.FirewoodFormFacetChassis, {paddingTop: insets.top}]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.FirewoodFormHeaderEnclave}>
        <Text style={styles.FirewoodFormHeaderFiligree}>
          {FIREWOOD_COPY.header}
        </Text>
      </View>

      <ScrollView
        style={styles.FirewoodFormScroll}
        contentContainerStyle={styles.FirewoodFormScrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={() => setOpenSelect(null)}>
        <Text style={styles.FirewoodFormDescriptionFiligree}>
          {FIREWOOD_COPY.description}
        </Text>

        <View style={styles.FirewoodFormFieldBlock}>
          <Text style={styles.FirewoodFormLabelFiligree}>
            {FIREWOOD_COPY.areaLabel}
          </Text>
          <TextInput
            value={areaText}
            onChangeText={text => {
              setAreaText(text);
              setOpenSelect(null);
            }}
            placeholder={FIREWOOD_COPY.areaPlaceholder}
            placeholderTextColor={colors.checked}
            keyboardType="decimal-pad"
            style={[
              styles.FirewoodFormAreaInput,
              areaText.length > 0 && styles.FirewoodFormAreaInputActive,
            ]}
          />
        </View>

        <View style={styles.FirewoodFormSelectGap}>
          <SelectField
            label={FIREWOOD_COPY.seasonLabel}
            placeholder={FIREWOOD_COPY.selectPlaceholder}
            options={FIREWOOD_SEASONS}
            valueId={seasonId}
            open={openSelect === 'season'}
            onToggle={() => toggleSelect('season')}
            onSelect={id => {
              setSeasonId(id as FirewoodSeasonId);
              setOpenSelect(null);
            }}
          />
        </View>

        <View style={styles.FirewoodFormSelectGap}>
          <SelectField
            label={FIREWOOD_COPY.fireplaceLabel}
            placeholder={FIREWOOD_COPY.selectPlaceholder}
            options={FIREWOOD_FIREPLACES}
            valueId={fireplaceId}
            open={openSelect === 'fireplace'}
            onToggle={() => toggleSelect('fireplace')}
            onSelect={id => {
              setFireplaceId(id as FirewoodFireplaceId);
              setOpenSelect(null);
            }}
          />
        </View>

        <View style={styles.FirewoodFormSelectGap}>
          <SelectField
            label={FIREWOOD_COPY.temperatureLabel}
            placeholder={FIREWOOD_COPY.selectPlaceholder}
            options={FIREWOOD_TEMPERATURES}
            valueId={temperatureId}
            open={openSelect === 'temperature'}
            onToggle={() => toggleSelect('temperature')}
            onSelect={id => {
              setTemperatureId(id as FirewoodTemperatureId);
              setOpenSelect(null);
            }}
          />
        </View>

        <View style={styles.FirewoodFormActionGap}>
          {canCalculate ? (
            <PrimaryButton label="Calculate" onPress={handleCalculate} />
          ) : (
            <Pressable
              disabled
              style={styles.FirewoodFormDisabledPortico}
              accessibilityState={{disabled: true}}>
              <Text style={styles.FirewoodFormDisabledFiligree}>Calculate</Text>
            </Pressable>
          )}
        </View>

        {!canCalculate ? (
          <Text style={styles.FirewoodFormHintFiligree}>
            {FIREWOOD_COPY.calculateHint}
          </Text>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  FirewoodFormFacetChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  FirewoodFormHeaderEnclave: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: spacing.l,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
  },

  FirewoodFormHeaderFiligree: {
    color: colors.cream,
    fontFamily: fonts.cinzelBold,
    fontSize: fontSize.screenTitle,
    letterSpacing: 1.08,
    lineHeight: 27,
    textTransform: 'uppercase',
  },

  FirewoodFormScroll: {
    flex: 1,
  },

  FirewoodFormScrollContent: {
    paddingBottom: spacing.xxxl,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
  },

  FirewoodFormDescriptionFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: fontSize.body,
    lineHeight: 23.1,
  },

  FirewoodFormFieldBlock: {
    marginTop: 24,
  },

  FirewoodFormLabelFiligree: {
    color: colors.body,
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.96,
    lineHeight: 18,
    textTransform: 'uppercase',
  },
  FirewoodFormAreaInput: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },

  FirewoodFormAreaInputActive: {
    borderColor: colors.goldMuted,
  },
  FirewoodFormSelectGap: {
    marginTop: 16,
  },

  FirewoodFormActionGap: {
    marginTop: 16,
  },

  FirewoodFormDisabledPortico: {
    alignItems: 'center',
    backgroundColor: colors.border,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    width: '100%',
  },
  FirewoodFormDisabledFiligree: {
    color: colors.checked,
    fontFamily: fonts.sansSemiBold,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.6,
  },

  FirewoodFormHintFiligree: {
    color: colors.checked,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    letterSpacing: 0.36,
    lineHeight: 18,
    marginTop: 10,
    textAlign: 'center',
  },
});
