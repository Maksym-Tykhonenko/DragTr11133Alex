import React from 'react';
import {
  Image,
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
import {
  colors,
  fonts,
  fontSize,
  layout,
  radius,
  spacing,
} from '../constants/theme';
import {CHECK_INTRO} from '../data/check';
import {checkImages} from '../data/assets';
import type {CheckStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<CheckStackParamList, 'CheckIntro'>;

export function CheckIntroScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.CheckIntroFacetChassis, {paddingTop: insets.top}]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.CheckIntroHeaderEnclave}>
        <Text style={styles.CheckIntroHeaderFiligree}>{CHECK_INTRO.header}</Text>
      </View>

      <ScrollView
        style={styles.CheckIntroScroll}
        contentContainerStyle={styles.CheckIntroScrollContent}
        showsVerticalScrollIndicator={false}>
        <Image
          source={checkImages.hero}
          style={styles.CheckIntroHeroSigil}
          resizeMode="cover"
        />

        <Text style={styles.CheckIntroTitleFiligree}>{CHECK_INTRO.title}</Text>

        <View style={styles.CheckIntroDividerGap}>
          <GoldDivider />
        </View>

        <Text style={styles.CheckIntroBodyFiligree}>
          {CHECK_INTRO.description}
        </Text>

        <PrimaryButton
          label="Start Check"
          onPress={() => navigation.navigate('CheckQuestion', {index: 0})}
          style={styles.CheckIntroStartPortico}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  CheckIntroFacetChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },

  CheckIntroHeaderEnclave: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: spacing.l,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
  },
  CheckIntroHeaderFiligree: {
    color: colors.cream,
    fontFamily: fonts.cinzelBold,
    fontSize: fontSize.screenTitle,
    letterSpacing: 1.08,
    lineHeight: 27,
    textTransform: 'uppercase',
  },

  CheckIntroScroll: {
    flex: 1,
  },

  CheckIntroScrollContent: {
    paddingBottom: spacing.xxxl,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
  },

  CheckIntroHeroSigil: {
    borderRadius: radius.image,
    height: layout.checkHeroHeight,
    width: '100%',
  },

  CheckIntroTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.cinzelBold,
    fontSize: fontSize.detailTitle,
    letterSpacing: 0.6,
    lineHeight: 30,
    marginTop: 22,
    textTransform: 'uppercase',
  },

  CheckIntroDividerGap: {
    marginTop: 10,
  },
  CheckIntroBodyFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: fontSize.body,
    lineHeight: 23.8,
    marginTop: spacing.l,
  },

  CheckIntroStartPortico: {
    marginTop: 28,
  },
});
