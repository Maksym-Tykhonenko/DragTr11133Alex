import React from 'react';
import {StyleSheet, View} from 'react-native';

import {colors} from '../../constants/theme';

export function GoldDivider() {
  return (
    <View style={styles.GoldDividerLintel}>
      <View style={styles.GoldDividerFill} />
    </View>
  );
}

const styles = StyleSheet.create({
  GoldDividerLintel: {
    height: 1,
    overflow: 'hidden',
    width: '100%',
  },

  GoldDividerFill: {
    backgroundColor: colors.goldMuted,
    height: 1,
    opacity: 0.85,
    width: '100%',
  },
});
