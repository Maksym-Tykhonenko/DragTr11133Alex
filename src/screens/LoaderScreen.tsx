import React, { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { colors, spacing } from '../constants/theme';
import { icons } from '../data/assets';
import type { RootStackParamList } from '../navigation/types';

const LOADER_DURATION_MS = 3000;

type LoaderScreenProps = NativeStackScreenProps<RootStackParamList, 'LoaderScreen'>;

export function LoaderScreen({ navigation }: LoaderScreenProps) {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('OnboardingScreen');
    }, LOADER_DURATION_MS);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.LoaderScreenFacetChassis}>
      <Image
        source={icons.loaderBg}
        style={[
          styles.LoaderScreenBackgroundImage,
          { width: '100%', height: '100%' },
        ]}
        resizeMode="cover"
      />
      <View
        style={[
          styles.LoaderScreenSpinnerEnclave,
          { bottom: Math.max(insets.bottom, spacing.xl) + spacing.xxl },
        ]}
        pointerEvents="none"
      >
        <ActivityIndicator size="large" color={colors.cream} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  LoaderScreenFacetChassis: {
    backgroundColor: colors.black,
    flex: 1,
    overflow: 'hidden',
  },

  LoaderScreenBackgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
  },

  LoaderScreenSpinnerEnclave: {
    alignItems: 'center',
    elevation: 10,
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 10,
  },
});
