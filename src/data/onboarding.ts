import type {ImageSourcePropType} from 'react-native';

import {onboardingImages} from './assets';

export type OnboardingStep = {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  description: string;
  buttonLabel: string;
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    image: onboardingImages.step1,
    title: 'Understand Your\nChimney',
    subtitle: 'Your Guide to Chimney Care',
    description:
      'Learn how smoke, soot, airflow, and draft affect the safety of your fireplace.',
    buttonLabel: 'Next',
  },
  {
    image: onboardingImages.step2,
    title: 'Stay Ready\nEvery Season',
    subtitle: 'Your Guide to Chimney Care',
    description:
      'Follow simple seasonal maintenance tasks and keep your fireplace prepared throughout the year.',
    buttonLabel: 'Next',
  },
  {
    image: onboardingImages.step3,
    title: 'Check Before\nYou Burn',
    subtitle: 'Your Guide to Chimney Care',
    description:
      'Review your chimney condition and discover when cleaning, inspection, or professional help may be needed.',
    buttonLabel: 'Next',
  },
  {
    image: onboardingImages.step4,
    title: 'Make Fireplace\nCare Simple',
    subtitle: 'Your Guide to Chimney Care',
    description:
      'Use checklists, safety timers, and firewood estimates to manage your fireplace with confidence.',
    buttonLabel: 'Get Started',
  },
];
