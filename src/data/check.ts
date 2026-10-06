export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export type CheckOption = {
  id: string;
  label: string;
  points: 0 | 1 | 2 | 3;
  criticalOverride?: boolean;
};

export type CheckQuestion = {
  id: string;
  prompt: string;
  options: CheckOption[];
};

export type CheckResult = {
  level: RiskLevel;
  label: string;
  title: string;
  text: string;
  recommendation: string;
};

export const CHECK_INTRO = {
  header: 'Condition Check',
  title: 'Check Your Chimney',
  description:
    "This assessment reviews your chimney's age, type, usage patterns, smoke behavior, draft quality, visible damage, soot levels, and cleaning history to give you a clear picture of its current condition.",
};

export const CHECK_QUESTIONS: CheckQuestion[] = [
  {
    id: 'age',
    prompt: 'How old is your chimney?',
    options: [
      {id: 'age-0', label: 'Less than 5 years', points: 0},
      {id: 'age-1', label: '5–10 years', points: 1},
      {id: 'age-2', label: '11–20 years', points: 2},
      {id: 'age-3', label: 'More than 20 years', points: 3},
    ],
  },
  {
    id: 'type',
    prompt: 'What type of chimney do you have?',
    options: [
      {id: 'type-0', label: 'New insulated chimney', points: 0},
      {id: 'type-1', label: 'Masonry chimney in good condition', points: 1},
      {id: 'type-2', label: 'Older masonry chimney', points: 2},
      {
        id: 'type-3',
        label: 'Unknown or visibly damaged chimney',
        points: 3,
      },
    ],
  },
  {
    id: 'usage',
    prompt: 'How often do you use your fireplace?',
    options: [
      {id: 'usage-0', label: 'A few times per year', points: 0},
      {id: 'usage-1', label: 'A few times per month', points: 1},
      {id: 'usage-2', label: 'Several times per week', points: 2},
      {id: 'usage-3', label: 'Almost every day', points: 3},
    ],
  },
  {
    id: 'smoke',
    prompt: 'Do you notice a smoke smell indoors?',
    options: [
      {id: 'smoke-0', label: 'Never', points: 0},
      {id: 'smoke-1', label: 'Only when starting a fire', points: 1},
      {id: 'smoke-2', label: 'Sometimes during burning', points: 2},
      {
        id: 'smoke-3',
        label: 'Often or continuously',
        points: 3,
        criticalOverride: true,
      },
    ],
  },
  {
    id: 'draft',
    prompt: 'How strong is the chimney draft?',
    options: [
      {id: 'draft-0', label: 'Strong and consistent', points: 0},
      {id: 'draft-1', label: 'Usually normal', points: 1},
      {id: 'draft-2', label: 'Sometimes weak', points: 2},
      {
        id: 'draft-3',
        label: 'Very weak or smoke comes back inside',
        points: 3,
        criticalOverride: true,
      },
    ],
  },
  {
    id: 'damage',
    prompt: 'Can you see cracks or damaged parts?',
    options: [
      {id: 'damage-0', label: 'No visible damage', points: 0},
      {id: 'damage-1', label: 'Small surface marks', points: 1},
      {id: 'damage-2', label: 'Several cracks or loose areas', points: 2},
      {
        id: 'damage-3',
        label: 'Major cracks or unstable parts',
        points: 3,
        criticalOverride: true,
      },
    ],
  },
  {
    id: 'soot',
    prompt: 'How much soot can you see?',
    options: [
      {id: 'soot-0', label: 'Almost none', points: 0},
      {id: 'soot-1', label: 'A thin layer', points: 1},
      {id: 'soot-2', label: 'Noticeable buildup', points: 2},
      {
        id: 'soot-3',
        label: 'Thick, sticky, or tar-like buildup',
        points: 3,
        criticalOverride: true,
      },
    ],
  },
  {
    id: 'cleaning',
    prompt: 'When was your chimney last cleaned?',
    options: [
      {id: 'cleaning-0', label: 'Within the last 6 months', points: 0},
      {id: 'cleaning-1', label: '6–12 months ago', points: 1},
      {id: 'cleaning-2', label: 'More than a year ago', points: 2},
      {id: 'cleaning-3', label: 'I do not remember', points: 3},
    ],
  },
];

export const CHECK_RESULTS: Record<RiskLevel, CheckResult> = {
  low: {
    level: 'low',
    label: 'Low Risk',
    title: 'Your Chimney Looks Low Risk',
    text: 'Your answers show few current warning signs. Continue with regular seasonal maintenance and keep monitoring the smoke, fire, and chimney draft.',
    recommendation:
      'Keep your fireplace care routine, check your safety detectors, and schedule regular cleaning according to local requirements.',
  },
  moderate: {
    level: 'moderate',
    label: 'Moderate Risk',
    title: 'Some Maintenance May Be Needed',
    text: 'Your answers show several conditions that may require attention. The chimney may still be usable, but delaying cleaning or inspection could allow small problems to become more serious.',
    recommendation:
      'Plan a chimney cleaning, inspect the damper and chimney cap, and monitor any changes in smoke, smell, or draft.',
  },
  high: {
    level: 'high',
    label: 'High Risk',
    title: 'Professional Inspection Recommended',
    text: 'Your answers indicate several warning signs connected with chimney age, soot, draft, damage, or cleaning history. The fireplace should not be used frequently until its condition has been checked.',
    recommendation:
      'Arrange a professional chimney inspection and cleaning before continuing regular fireplace use.',
  },
  critical: {
    level: 'critical',
    label: 'Critical Risk',
    title: 'Stop Using the Fireplace',
    text: 'Your answers indicate a potentially serious safety concern. Smoke entering the room, major visible damage, thick tar-like buildup, or an unknown chimney condition should not be ignored.',
    recommendation:
      'Stop using the fireplace and contact a qualified chimney professional. Do not restart the fire until the chimney and fireplace have been inspected.',
  },
};

export const CHECK_QUESTION_COUNT = CHECK_QUESTIONS.length;
export const CHECK_MAX_SCORE = 24;

export function getQuestionByIndex(index: number): CheckQuestion | undefined {
  return CHECK_QUESTIONS[index];
}

export function getOption(
  questionId: string,
  optionId: string,
): CheckOption | undefined {
  const question = CHECK_QUESTIONS.find(item => item.id === questionId);
  return question?.options.find(option => option.id === optionId);
}

export function scoreAnswers(
  answers: Record<string, string>,
): {score: number; result: CheckResult} {
  let score = 0;
  let critical = false;

  for (const question of CHECK_QUESTIONS) {
    const optionId = answers[question.id];
    if (!optionId) {
      continue;
    }
    const option = question.options.find(item => item.id === optionId);
    if (!option) {
      continue;
    }
    score += option.points;
    if (option.criticalOverride) {
      critical = true;
    }
  }

  if (critical) {
    return {score, result: CHECK_RESULTS.critical};
  }

  if (score <= 5) {
    return {score, result: CHECK_RESULTS.low};
  }
  if (score <= 11) {
    return {score, result: CHECK_RESULTS.moderate};
  }
  if (score <= 17) {
    return {score, result: CHECK_RESULTS.high};
  }
  return {score, result: CHECK_RESULTS.critical};
}
