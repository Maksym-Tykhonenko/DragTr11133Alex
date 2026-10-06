import {Platform} from 'react-native';

import {fonts} from './fonts';

export const DESIGN_WIDTH = 393;
export const DESIGN_HEIGHT = 852;

export const colors = {
  background: '#111111',
  surface: '#0a0a0a',
  card: '#1b1b1b',
  border: '#252525',
  black: '#000000',
  cream: '#f3ebdd',
  gold: '#d5a94f',
  goldMuted: '#b88938',
  goldSoft: '#b8ad9a',
  goldBright: '#e6c56e',
  body: '#b8ad9a',
  checked: '#71695e',
  radioIdle: '#71695e',
  ember: '#761d22',
  emberDeep: '#421719',
  danger: '#a52a2f',
  dangerLine: 'rgba(165,42,47,0.38)',
  buttonText: '#111111',
  buttonGradientStart: '#b88938',
  buttonGradientEnd: '#d5a94f',
  tabBar: '#1b1b1b',
  white: '#ffffff',
};

export const spacing = {
  s: 8,
  m: 12,
  l: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  screen: 24,
};

export const radius = {
  image: 8,
  button: 10,
  card: 10,
};

export const fontSize = {
  tab: 10,
  step: 12,
  subtitle: 13,
  body: 14,
  button: 15,
  cardTitle: 15,
  screenTitle: 18,
  detailTitle: 20,
  title: 28,
};

export const layout = {
  buttonHeight: 50,
  cardButtonHeight: 42,
  imageSize: 345,
  cardImageHeight: 160,
  detailImageHeight: 200,
  seasonHeroHeight: 170,
  checkHeroHeight: 220,
  timerHeroSize: 208,
  timerDisplayHeight: 155,
  checkboxSize: 22,
  radioSize: 20,
  progressBarHeight: 4,
  checkProgressHeight: 3,
  tabBarHeight: 80,
};

export const topInset = (value: number) =>
  Platform.OS === 'android' ? Math.max(value, 30) : value;

export {fonts};
