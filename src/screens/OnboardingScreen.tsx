import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {GoldDivider} from '../components/onboarding/GoldDivider';
import {colors, fonts, fontSize, spacing} from '../constants/theme';
import {ONBOARDING_STEPS} from '../data/onboarding';
import type {RootStackParamList} from '../navigation/types';

type OnboardingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'OnboardingScreen'
>;

export function OnboardingScreen({navigation}: OnboardingScreenProps) {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const [stepIndex, setStepIndex] = useState(0);

  const step = ONBOARDING_STEPS[stepIndex];
  const isLastStep = stepIndex === ONBOARDING_STEPS.length - 1;
  const imageSize = Math.min(width - spacing.screen * 2, 345);

  const handleNext = () => {
    if (isLastStep) {
      navigation.navigate('MainTabNavigator');
      return;
    }
    setStepIndex(prev => prev + 1);
  };

  return (
    <View style={styles.OnboardingScreenFacetChassis}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.OnboardingScreenScroll}
        contentContainerStyle={[
          styles.OnboardingScreenScrollContent,
          {
            paddingTop: insets.top + spacing.l,
            paddingBottom: insets.bottom + 40,
          },
        ]}
        showsVerticalScrollIndicator={false}
        bounces
        keyboardShouldPersistTaps="handled">
        <Text style={styles.OnboardingScreenStepFiligree}>
          {stepIndex + 1} / {ONBOARDING_STEPS.length}
        </Text>

        <Image
          source={step.image}
          style={[
            styles.OnboardingScreenHeroSigil,
            {width: imageSize, height: imageSize},
          ]}
          resizeMode="cover"
        />

        <View style={styles.OnboardingScreenCopyEnclave}>
          <GoldDivider />
          <Text style={styles.OnboardingScreenTitleFiligree}>{step.title}</Text>
          <Text style={styles.OnboardingScreenSubtitleFiligree}>
            {step.subtitle}
          </Text>
          <View style={styles.OnboardingScreenDividerGap}>
            <GoldDivider />
          </View>
          <Text style={styles.OnboardingScreenBodyFiligree}>
            {step.description}
          </Text>
        </View>

        <View style={styles.OnboardingScreenFooter}>
          <PrimaryButton label={step.buttonLabel} onPress={handleNext} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  OnboardingScreenFacetChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },

  OnboardingScreenScroll: {
    flex: 1,
  },

  OnboardingScreenScrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.screen,
  },
  OnboardingScreenStepFiligree: {
    color: colors.goldSoft,
    fontFamily: fonts.sansRegular,
    fontSize: fontSize.step,
    lineHeight: 18,
    marginBottom: spacing.xxl,
    paddingTop: spacing.l,
  },

  OnboardingScreenHeroSigil: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  OnboardingScreenCopyEnclave: {
    flexGrow: 1,
    paddingTop: spacing.xxxl,
  },

  OnboardingScreenTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.cinzelBold,
    fontSize: fontSize.title,
    letterSpacing: 1.68,
    lineHeight: 33.6,
    marginTop: spacing.m,
    textTransform: 'uppercase',
  },
  OnboardingScreenSubtitleFiligree: {
    color: colors.gold,
    fontFamily: fonts.cinzelRegular,
    fontSize: fontSize.subtitle,
    letterSpacing: 1.56,
    lineHeight: 19.5,
    marginTop: 6,
    textTransform: 'uppercase',
  },

  OnboardingScreenDividerGap: {
    marginTop: spacing.xl,
  },
  OnboardingScreenBodyFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: fontSize.body,
    lineHeight: 23.1,
    marginTop: spacing.xl,
  },

  OnboardingScreenFooter: {
    marginTop: 'auto',
    paddingTop: spacing.xxl,
  },
});
