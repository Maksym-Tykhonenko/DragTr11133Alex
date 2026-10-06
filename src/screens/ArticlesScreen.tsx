import React from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {ArticleCard} from '../components/articles/ArticleCard';
import {colors, fonts, fontSize, spacing} from '../constants/theme';
import {ARTICLES} from '../data/articles';
import type {ArticlesStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<ArticlesStackParamList, 'ArticlesList'>;

export function ArticlesScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.ArticlesScreenFacetChassis, {paddingTop: insets.top}]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.ArticlesScreenHeaderEnclave}>
        <Text style={styles.ArticlesScreenTitleFiligree}>
          Fireplace Care Guide
        </Text>
      </View>
      <FlatList
        data={ARTICLES}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.ArticlesScreenList}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <ArticleCard
            article={item}
            onOpen={() =>
              navigation.navigate('ArticleDetail', {articleId: item.id})
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ArticlesScreenFacetChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  ArticlesScreenHeaderEnclave: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: spacing.l,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
  },

  ArticlesScreenTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.cinzelBold,
    fontSize: fontSize.screenTitle,
    letterSpacing: 1.08,
    lineHeight: 27,
    textTransform: 'uppercase',
  },
  ArticlesScreenList: {
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
  },
});
