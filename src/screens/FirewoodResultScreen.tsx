import React from 'react';
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
import {GoldDivider} from '../components/onboarding/GoldDivider';
import {colors, fonts, spacing} from '../constants/theme';
import {FIREWOOD_COPY} from '../data/firewood';
import {icons} from '../data/assets';
import type {FirewoodStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<FirewoodStackParamList, 'FirewoodResult'>;

export function FirewoodResultScreen({navigation, route}: Props) {
  const insets = useSafeAreaInsets();
  const {estimate} = route.params;

  return (
    <View
      style={[styles.FirewoodResultFacetChassis, {paddingTop: insets.top}]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.FirewoodResultHeaderLintel}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.FirewoodResultBackPortico}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Image
            source={icons.back}
            style={styles.FirewoodResultBackSigil}
            resizeMode="contain"
          />
        </Pressable>
        <Text style={styles.FirewoodResultHeaderFiligree}>
          Calculator Result
        </Text>
      </View>

      <ScrollView
        style={styles.FirewoodResultScroll}
        contentContainerStyle={styles.FirewoodResultScrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.FirewoodResultHeroCard}>
          <Text style={styles.FirewoodResultHeroLabelFiligree}>
            Estimated firewood needed
          </Text>
          <View style={styles.FirewoodResultDividerGap}>
            <GoldDivider />
          </View>
          <View style={styles.FirewoodResultValueRow}>
            <Text style={styles.FirewoodResultValueFiligree}>
              {estimate.rangeLabel}
            </Text>
            <Text style={styles.FirewoodResultUnitFiligree}>m³ / season</Text>
          </View>
          <Text style={styles.FirewoodResultApproxFiligree}>
            Approximately {estimate.rangeLabel} cubic meters per season
          </Text>
        </View>

        <View style={styles.FirewoodResultSummaryCard}>
          <SummaryRow
            label="Area"
            value={`${estimate.area} m²`}
          />
          <SummaryRow label="Season" value={estimate.seasonLabel} />
          <SummaryRow label="Fireplace" value={estimate.fireplaceLabel} />
          <SummaryRow
            label="Temperature"
            value={estimate.temperatureLabel}
            isLast
          />
        </View>

        <View style={styles.FirewoodResultNoteCard}>
          <Text style={styles.FirewoodResultNoteFiligree}>
            <Text style={styles.FirewoodResultNoteLeadFiligree}>Note: </Text>
            {FIREWOOD_COPY.note}
          </Text>
        </View>

        <PrimaryButton
          label="Recalculate"
          onPress={() => navigation.goBack()}
          style={styles.FirewoodResultRecalcPortico}
        />
      </ScrollView>
    </View>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
  isLast?: boolean;
};

function SummaryRow({label, value, isLast = false}: SummaryRowProps) {
  return (
    <View
      style={[
        styles.FirewoodResultSummaryRow,
        !isLast && styles.FirewoodResultSummaryRowBorder,
      ]}>
      <Text style={styles.FirewoodResultSummaryLabelFiligree}>{label}</Text>
      <Text
        style={styles.FirewoodResultSummaryValueFiligree}
        numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  FirewoodResultFacetChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },

  FirewoodResultHeaderLintel: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 12,
    paddingBottom: spacing.l,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
  },
  FirewoodResultBackPortico: {
    alignItems: 'center',
    height: 20,
    justifyContent: 'center',
    width: 20,
  },

  FirewoodResultBackSigil: {
    height: 20,
    tintColor: colors.gold,
    width: 20,
  },

  FirewoodResultHeaderFiligree: {
    color: colors.cream,
    fontFamily: fonts.cinzelBold,
    fontSize: 17,
    lineHeight: 25.5,
    textTransform: 'uppercase',
  },
  FirewoodResultScroll: {
    flex: 1,
  },

  FirewoodResultScrollContent: {
    paddingBottom: spacing.xxxl,
    paddingHorizontal: spacing.screen,
    paddingTop: 28,
  },
  FirewoodResultHeroCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 28,
  },

  FirewoodResultHeroLabelFiligree: {
    color: colors.body,
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1.2,
    lineHeight: 18,
    textTransform: 'uppercase',
  },
  FirewoodResultDividerGap: {
    marginTop: 10,
  },

  FirewoodResultValueRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 20,
  },
  FirewoodResultValueFiligree: {
    color: colors.goldBright,
    fontFamily: fonts.sansMedium,
    fontSize: 40,
    fontWeight: '500',
    lineHeight: 60,
  },

  FirewoodResultUnitFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  FirewoodResultApproxFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },

  FirewoodResultSummaryCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  FirewoodResultSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 8,
  },

  FirewoodResultSummaryRowBorder: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },

  FirewoodResultSummaryLabelFiligree: {
    color: colors.checked,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 19.5,
  },

  FirewoodResultSummaryValueFiligree: {
    color: colors.body,
    flexShrink: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 19.5,
    textAlign: 'right',
  },

  FirewoodResultNoteCard: {
    backgroundColor: colors.border,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  FirewoodResultNoteFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 21.45,
  },

  FirewoodResultNoteLeadFiligree: {
    color: colors.goldMuted,
    fontFamily: fonts.sansSemiBold,
    fontWeight: '600',
  },

  FirewoodResultRecalcPortico: {
    marginTop: 28,
  },
});
