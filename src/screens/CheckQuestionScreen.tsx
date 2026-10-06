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
import {AnswerOption} from '../components/check/AnswerOption';
import {colors, fonts, layout, spacing} from '../constants/theme';
import {
  CHECK_QUESTION_COUNT,
  getQuestionByIndex,
} from '../data/check';
import {icons} from '../data/assets';
import {useCheckAnswers} from '../navigation/CheckAnswersContext';
import type {CheckStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<CheckStackParamList, 'CheckQuestion'>;

export function CheckQuestionScreen({navigation, route}: Props) {
  const insets = useSafeAreaInsets();
  const {answers, setAnswer} = useCheckAnswers();
  const index = route.params.index;
  const question = getQuestionByIndex(index);

  if (!question) {
    return (
      <View style={styles.CheckQuestionFacetChassis}>
        <Text style={styles.CheckQuestionErrorFiligree}>Question not found.</Text>
      </View>
    );
  }

  const selectedId = answers[question.id];
  const progress = ((index + 1) / CHECK_QUESTION_COUNT) * 100;
  const isLast = index === CHECK_QUESTION_COUNT - 1;
  const canContinue = Boolean(selectedId);

  const handleNext = () => {
    if (!selectedId) {
      return;
    }
    if (isLast) {
      navigation.navigate('CheckResult');
      return;
    }
    navigation.push('CheckQuestion', {index: index + 1});
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate('CheckIntro');
  };

  return (
    <View style={[styles.CheckQuestionFacetChassis, {paddingTop: insets.top}]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.CheckQuestionHeaderLintel}>
        <Pressable
          onPress={handleBack}
          style={styles.CheckQuestionBackPortico}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Image
            source={icons.back}
            style={styles.CheckQuestionBackSigil}
            resizeMode="contain"
          />
        </Pressable>
        <Text style={styles.CheckQuestionCounterFiligree}>
          {index + 1} / {CHECK_QUESTION_COUNT}
        </Text>
        <View style={styles.CheckQuestionHeaderSpacer} />
      </View>

      <View style={styles.CheckQuestionProgressTrack}>
        <View
          style={[styles.CheckQuestionProgressFill, {width: `${progress}%`}]}
        />
      </View>

      <ScrollView
        style={styles.CheckQuestionScroll}
        contentContainerStyle={styles.CheckQuestionScrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.CheckQuestionStepFiligree}>
          Question {index + 1}
        </Text>
        <Text style={styles.CheckQuestionPromptFiligree}>{question.prompt}</Text>

        <View style={styles.CheckQuestionOptions}>
          {question.options.map(option => (
            <AnswerOption
              key={option.id}
              label={option.label}
              selected={selectedId === option.id}
              onPress={() => setAnswer(question.id, option.id)}
            />
          ))}
        </View>

        <PrimaryButton
          label={isLast ? 'See Result' : 'Next'}
          onPress={handleNext}
          disabled={!canContinue}
          style={styles.CheckQuestionNextPortico}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  CheckQuestionFacetChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },

  CheckQuestionErrorFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    margin: spacing.screen,
  },
  CheckQuestionHeaderLintel: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing.l,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
  },

  CheckQuestionBackPortico: {
    alignItems: 'center',
    height: 20,
    justifyContent: 'center',
    width: 20,
  },

  CheckQuestionBackSigil: {
    height: 20,
    tintColor: colors.gold,
    width: 20,
  },

  CheckQuestionCounterFiligree: {
    color: colors.gold,
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 19.5,
  },
  CheckQuestionHeaderSpacer: {
    width: 20,
  },

  CheckQuestionProgressTrack: {
    backgroundColor: colors.border,
    height: layout.checkProgressHeight,
    width: '100%',
  },
  CheckQuestionProgressFill: {
    backgroundColor: colors.gold,
    height: '100%',
  },

  CheckQuestionScroll: {
    flex: 1,
  },
  CheckQuestionScrollContent: {
    paddingBottom: spacing.xxxl,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xxxl,
  },

  CheckQuestionStepFiligree: {
    color: colors.body,
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1.2,
    lineHeight: 18,
    textTransform: 'uppercase',
  },
  CheckQuestionPromptFiligree: {
    color: colors.cream,
    fontFamily: fonts.cinzelBold,
    fontSize: 19,
    lineHeight: 25.65,
    marginTop: 12,
    textTransform: 'uppercase',
  },

  CheckQuestionOptions: {
    gap: 10,
    marginTop: 28,
  },
  CheckQuestionNextPortico: {
    marginTop: 28,
  },
});
