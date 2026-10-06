import React from 'react';
import {Image, Share, StyleSheet, Text, View} from 'react-native';

import {OutlineButton} from '../buttons/OutlineButton';
import {PrimaryButton} from '../buttons/PrimaryButton';
import {GoldDivider} from '../onboarding/GoldDivider';
import {colors, fonts, fontSize, layout, radius, spacing} from '../../constants/theme';
import type {Article} from '../../data/articles';

type ArticleCardProps = {
  article: Article;
  onOpen: () => void;
};

export function ArticleCard({article, onOpen}: ArticleCardProps) {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.summary}`,
      });
    } catch {
      // user dismissed share sheet
    }
  };

  return (
    <View style={styles.ArticleCardFacetChassis}>
      <Image
        source={article.image}
        style={styles.ArticleCardHeroSigil}
        resizeMode="cover"
      />
      <View style={styles.ArticleCardBodyEnclave}>
        <Text style={styles.ArticleCardTitleFiligree}>{article.title}</Text>
        <Text style={styles.ArticleCardSummaryFiligree}>{article.summary}</Text>
        <View style={styles.ArticleCardDividerGap}>
          <GoldDivider />
        </View>
        <View style={styles.ArticleCardActionsLintel}>
          <View style={styles.ArticleCardActionHalf}>
            <PrimaryButton label="Open" onPress={onOpen} compact />
          </View>
          <View style={styles.ArticleCardActionHalf}>
            <OutlineButton
              label="Share"
              onPress={handleShare}
              showShareIcon
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ArticleCardFacetChassis: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: 1,
    marginBottom: spacing.xl,
    overflow: 'hidden',
  },

  ArticleCardHeroSigil: {
    height: layout.cardImageHeight,
    width: '100%',
  },

  ArticleCardBodyEnclave: {
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.l,
    paddingTop: spacing.l,
  },

  ArticleCardTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.cinzelBold,
    fontSize: fontSize.cardTitle,
    letterSpacing: 0.45,
    lineHeight: 19.5,
    textTransform: 'uppercase',
  },
  ArticleCardSummaryFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 20.8,
    marginTop: spacing.s,
  },

  ArticleCardDividerGap: {
    marginTop: spacing.l,
  },
  ArticleCardActionsLintel: {
    flexDirection: 'row',
    gap: 10,
    marginTop: spacing.l,
  },

  ArticleCardActionHalf: {
    flex: 1,
    width: undefined,
  },
});
