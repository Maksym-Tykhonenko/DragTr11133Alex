import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {GoldDivider} from '../components/onboarding/GoldDivider';
import {colors, fonts, fontSize, layout, radius, spacing} from '../constants/theme';
import {icons} from '../data/assets';
import {getArticleById} from '../data/articles';
import type {ArticlesStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<ArticlesStackParamList, 'ArticleDetail'>;

export function ArticleDetailScreen({navigation, route}: Props) {
  const insets = useSafeAreaInsets();
  const article = getArticleById(route.params.articleId);

  if (!article) {
    return (
      <View style={styles.ArticleDetailFacetChassis}>
        <Text style={styles.ArticleDetailBodyFiligree}>Article not found.</Text>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.body.join('\n\n')}`,
      });
    } catch {
      // dismissed
    }
  };

  return (
    <View style={[styles.ArticleDetailFacetChassis, {paddingTop: insets.top}]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.ArticleDetailHeaderLintel}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.ArticleDetailBackPortico}
          hitSlop={8}>
          <Image
            source={icons.back}
            style={styles.ArticleDetailBackSigil}
            resizeMode="contain"
          />
          <Text style={styles.ArticleDetailBackFiligree}>Articles</Text>
        </Pressable>
        <Pressable onPress={handleShare} hitSlop={8}>
          <Image
            source={icons.share}
            style={styles.ArticleDetailShareSigil}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.ArticleDetailScroll}
        showsVerticalScrollIndicator={false}>
        <Image
          source={article.image}
          style={styles.ArticleDetailHeroSigil}
          resizeMode="cover"
        />
        <Text style={styles.ArticleDetailTitleFiligree}>{article.title}</Text>
        <View style={styles.ArticleDetailDividerGap}>
          <GoldDivider />
        </View>
        {article.body.map((paragraph, index) => (
          <Text
            key={`${article.id}-${index}`}
            style={[
              styles.ArticleDetailBodyFiligree,
              index > 0 && styles.ArticleDetailBodySpaced,
            ]}>
            {paragraph}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ArticleDetailFacetChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  ArticleDetailHeaderLintel: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing.m,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.l,
  },

  ArticleDetailBackPortico: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    padding: 4,
  },
  ArticleDetailBackSigil: {
    height: 20,
    tintColor: colors.gold,
    width: 20,
  },

  ArticleDetailBackFiligree: {
    color: colors.gold,
    fontFamily: fonts.sansMedium,
    fontSize: fontSize.body,
    fontWeight: '500',
    lineHeight: 21,
  },
  ArticleDetailShareSigil: {
    height: 20,
    tintColor: colors.gold,
    width: 20,
  },

  ArticleDetailScroll: {
    paddingBottom: spacing.xxxl,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
  },

  ArticleDetailHeroSigil: {
    borderRadius: radius.image,
    height: layout.detailImageHeight,
    width: '100%',
  },

  ArticleDetailTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.cinzelBold,
    fontSize: fontSize.detailTitle,
    letterSpacing: 0.8,
    lineHeight: 26,
    marginTop: spacing.xl,
    textTransform: 'uppercase',
  },

  ArticleDetailDividerGap: {
    marginTop: spacing.l,
  },

  ArticleDetailBodyFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: fontSize.body,
    lineHeight: 24.5,
    marginTop: spacing.l,
  },

  ArticleDetailBodySpaced: {
    marginTop: spacing.xl,
  },
});
