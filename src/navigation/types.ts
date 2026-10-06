import type {FirewoodEstimate} from '../data/firewood';

export type AppPhase = 'Loader' | 'Onboarding' | 'Main';

export type ArticlesStackParamList = {
  ArticlesList: undefined;
  ArticleDetail: {articleId: string};
};

export type CheckStackParamList = {
  CheckIntro: undefined;
  CheckQuestion: {index: number};
  CheckResult: undefined;
};

export type FirewoodStackParamList = {
  FirewoodForm: undefined;
  FirewoodResult: {
    estimate: FirewoodEstimate;
  };
};

export type MainTabParamList = {
  ArticlesTab: undefined;
  SeasonsTab: undefined;
  CheckTab: undefined;
  ChecklistTab: undefined;
  TimerTab: undefined;
  FirewoodTab: undefined;
};

export type RootStackParamList = {
  LoaderScreen: undefined;
  OnboardingScreen: undefined;
  MainTabNavigator: undefined;
};
