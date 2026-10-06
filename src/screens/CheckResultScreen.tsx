import React, {useMemo} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {colors, fonts, spacing} from '../constants/theme';
import {scoreAnswers} from '../data/check';
import {icons} from '../data/assets';
import {useCheckAnswers} from '../navigation/CheckAnswersContext';
import type {CheckStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<CheckStackParamList, 'CheckResult'>;

export function CheckResultScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const {answers, resetAnswers} = useCheckAnswers();
  const {result} = useMemo(() => scoreAnswers(answers), [answers]);

  const handleRestart = () => {
    resetAnswers();
    navigation.popToTop();
  };

  const handleBack = () => {
    handleRestart();
  };

  return (
    <View style={[styles.CheckResultFacetChassis, {paddingTop: insets.top}]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.CheckResultHeaderLintel}>
        <Pressable
          onPress={handleBack}
          style={styles.CheckResultBackPortico}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Image
            source={icons.back}
            style={styles.CheckResultBackSigil}
            resizeMode="contain"
          />
        </Pressable>
        <Text style={styles.CheckResultHeaderFiligree}>Assessment Result</Text>
      </View>

      <ScrollView
        style={styles.CheckResultScroll}
        contentContainerStyle={styles.CheckResultScrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.CheckResultRiskCard}>
          <View style={styles.CheckResultRiskLabelRow}>
            <View style={styles.CheckResultRiskDot} />
            <Text style={styles.CheckResultRiskLabelFiligree}>
              Risk Assessment
            </Text>
          </View>
          <Text style={styles.CheckResultRiskTitleFiligree}>{result.label}</Text>
          <View style={styles.CheckResultRiskDivider} />
          <Text style={styles.CheckResultRiskBodyFiligree}>{result.text}</Text>
        </View>

        <View style={styles.CheckResultRecCard}>
          <Text style={styles.CheckResultRecLabelFiligree}>Recommendation</Text>
          <Text style={styles.CheckResultRecBodyFiligree}>
            {result.recommendation}
          </Text>
        </View>

        <PrimaryButton
          label="Restart Assessment"
          onPress={handleRestart}
          style={styles.CheckResultRestartPortico}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  CheckResultFacetChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },

  CheckResultHeaderLintel: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 12,
    paddingBottom: spacing.l,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
  },
  CheckResultBackPortico: {
    alignItems: 'center',
    height: 20,
    justifyContent: 'center',
    width: 20,
  },

  CheckResultBackSigil: {
    height: 20,
    tintColor: colors.gold,
    width: 20,
  },
  CheckResultHeaderFiligree: {
    color: colors.cream,
    fontFamily: fonts.cinzelBold,
    fontSize: 17,
    lineHeight: 25.5,
    textTransform: 'uppercase',
  },

  CheckResultScroll: {
    flex: 1,
  },

  CheckResultScrollContent: {
    paddingBottom: spacing.xxxl,
    paddingHorizontal: spacing.screen,
    paddingTop: 28,
  },
  CheckResultRiskCard: {
    backgroundColor: colors.emberDeep,
    borderColor: colors.danger,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },

  CheckResultRiskLabelRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  CheckResultRiskDot: {
    backgroundColor: colors.danger,
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  CheckResultRiskLabelFiligree: {
    color: colors.body,
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1.2,
    lineHeight: 18,
    textTransform: 'uppercase',
  },

  CheckResultRiskTitleFiligree: {
    color: colors.goldBright,
    fontFamily: fonts.cinzelBold,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    marginTop: 10,
    textTransform: 'uppercase',
  },

  CheckResultRiskDivider: {
    backgroundColor: colors.dangerLine,
    height: 1,
    marginTop: 12,
    width: '100%',
  },

  CheckResultRiskBodyFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 23.1,
    marginTop: 12,
  },

  CheckResultRecCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 24,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },

  CheckResultRecLabelFiligree: {
    color: colors.gold,
    fontFamily: fonts.sansSemiBold,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.04,
    lineHeight: 19.5,
    textTransform: 'uppercase',
  },
  CheckResultRecBodyFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 23.1,
    marginTop: 10,
  },

  CheckResultRestartPortico: {
    marginTop: 28,
  },
});
