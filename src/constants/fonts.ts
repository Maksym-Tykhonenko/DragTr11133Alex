import {Platform} from 'react-native';

const ios = {
  cinzelRegular: 'Cinzel-Regular',
  cinzelMedium: 'Cinzel-Medium',
  cinzelSemiBold: 'Cinzel-SemiBold',
  cinzelBold: 'Cinzel-Bold',
  cinzelExtraBold: 'Cinzel-ExtraBold',
  cinzelBlack: 'Cinzel-Black',
  sansRegular: 'System',
  sansMedium: 'System',
  sansSemiBold: 'System',
  sansBold: 'System',
};

const android = {
  cinzelRegular: 'Cinzel-Regular',
  cinzelMedium: 'Cinzel-Medium',
  cinzelSemiBold: 'Cinzel-SemiBold',
  cinzelBold: 'Cinzel-Bold',
  cinzelExtraBold: 'Cinzel-ExtraBold',
  cinzelBlack: 'Cinzel-Black',
  sansRegular: 'sans-serif',
  sansMedium: 'sans-serif-medium',
  sansSemiBold: 'sans-serif-medium',
  sansBold: 'sans-serif',
};

export const fonts = Platform.OS === 'ios' ? ios : android;
