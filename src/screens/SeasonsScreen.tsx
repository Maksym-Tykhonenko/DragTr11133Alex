import React, {useMemo} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {SeasonTaskRow} from '../components/seasons/SeasonTaskRow';
import {GoldDivider} from '../components/onboarding/GoldDivider';
import {
  colors,
  fonts,
  fontSize,
  layout,
  radius,
  spacing,
} from '../constants/theme';
import {SEASONS, type SeasonId} from '../data/seasons';
import {storageKeys} from '../storage/keys';
import {usePersistedState} from '../storage/usePersistedState';

type CompletionMap = Record<SeasonId, Record<string, boolean>>;

function createEmptyCompletion(): CompletionMap {
  return SEASONS.reduce((acc, season) => {
    acc[season.id] = {};
    return acc;
  }, {} as CompletionMap);
}

export function SeasonsScreen() {
  const insets = useSafeAreaInsets();
  const [activeSeasonId, setActiveSeasonId] = usePersistedState<SeasonId>(
    storageKeys.seasonsActiveId,
    'spring',
  );
  const [completedBySeason, setCompletedBySeason] =
    usePersistedState<CompletionMap>(
      storageKeys.seasonsCompletion,
      createEmptyCompletion(),
    );

  const season = useMemo(
    () => SEASONS.find(item => item.id === activeSeasonId) ?? SEASONS[0],
    [activeSeasonId],
  );

  const completedCount = season.tasks.filter(
    task => completedBySeason[season.id][task.id],
  ).length;
  const totalCount = season.tasks.length;
  const percent =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const toggleTask = (taskId: string) => {
    setCompletedBySeason(prev => ({
      ...prev,
      [season.id]: {
        ...prev[season.id],
        [taskId]: !prev[season.id][taskId],
      },
    }));
  };

  return (
    <View style={[styles.SeasonsScreenFacetChassis, {paddingTop: insets.top}]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.SeasonsScreenTabBar}>
        {SEASONS.map(item => {
          const isActive = item.id === activeSeasonId;
          return (
            <Pressable
              key={item.id}
              onPress={() => setActiveSeasonId(item.id)}
              style={[
                styles.SeasonsScreenTab,
                isActive && styles.SeasonsScreenTabActive,
              ]}>
              <Text
                style={[
                  styles.SeasonsScreenTabLabelFiligree,
                  isActive && styles.SeasonsScreenTabLabelActive,
                ]}>
                {item.tabLabel}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView
        style={styles.SeasonsScreenScroll}
        contentContainerStyle={styles.SeasonsScreenScrollContent}
        showsVerticalScrollIndicator={false}>
        <Image
          source={season.image}
          style={styles.SeasonsScreenHeroSigil}
          resizeMode="cover"
        />

        <Text style={styles.SeasonsScreenTitleFiligree}>{season.title}</Text>
        <Text style={styles.SeasonsScreenDescriptionFiligree}>
          {season.description}
        </Text>

        <View style={styles.SeasonsScreenProgressEnclave}>
          <View style={styles.SeasonsScreenProgressMeta}>
            <Text style={styles.SeasonsScreenProgressCountFiligree}>
              {completedCount} of {totalCount} completed
            </Text>
            <Text style={styles.SeasonsScreenProgressPercentFiligree}>
              {percent}%
            </Text>
          </View>
          <View style={styles.SeasonsScreenProgressTrack}>
            <View
              style={[
                styles.SeasonsScreenProgressFill,
                {width: `${percent}%`},
              ]}
            />
          </View>
        </View>

        <View style={styles.SeasonsScreenDividerGap}>
          <GoldDivider />
        </View>

        <View style={styles.SeasonsScreenTaskList}>
          {season.tasks.map((task, index) => (
            <SeasonTaskRow
              key={task.id}
              label={task.label}
              checked={Boolean(completedBySeason[season.id][task.id])}
              isLast={index === season.tasks.length - 1}
              onToggle={() => toggleTask(task.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  SeasonsScreenFacetChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  SeasonsScreenTabBar: {
    backgroundColor: colors.card,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },

  SeasonsScreenTab: {
    alignItems: 'center',
    borderBottomColor: 'transparent',
    borderBottomWidth: 1,
    flex: 1,
    paddingVertical: 14,
  },

  SeasonsScreenTabActive: {
    borderBottomColor: colors.gold,
  },

  SeasonsScreenTabLabelFiligree: {
    color: colors.goldSoft,
    fontFamily: fonts.sansRegular,
    fontSize: fontSize.subtitle,
    letterSpacing: 0.39,
    lineHeight: 19.5,
    textAlign: 'center',
  },
  SeasonsScreenTabLabelActive: {
    color: colors.gold,
    fontFamily: fonts.sansSemiBold,
    fontWeight: '600',
  },

  SeasonsScreenScroll: {
    flex: 1,
  },
  SeasonsScreenScrollContent: {
    paddingBottom: spacing.xxxl,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
  },

  SeasonsScreenHeroSigil: {
    borderRadius: radius.image,
    height: layout.seasonHeroHeight,
    width: '100%',
  },

  SeasonsScreenTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.cinzelBold,
    fontSize: fontSize.screenTitle,
    letterSpacing: 0.72,
    lineHeight: 27,
    marginTop: spacing.xl,
  },
  SeasonsScreenDescriptionFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: fontSize.subtitle,
    lineHeight: 20.8,
    marginTop: 6,
  },

  SeasonsScreenProgressEnclave: {
    marginTop: spacing.l,
  },
  SeasonsScreenProgressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  SeasonsScreenProgressCountFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: fontSize.step,
    lineHeight: 18,
  },

  SeasonsScreenProgressPercentFiligree: {
    color: colors.gold,
    fontFamily: fonts.sansRegular,
    fontSize: fontSize.step,
    lineHeight: 18,
  },

  SeasonsScreenProgressTrack: {
    backgroundColor: colors.border,
    borderRadius: 2,
    height: layout.progressBarHeight,
    marginTop: 6,
    overflow: 'hidden',
    width: '100%',
  },
  SeasonsScreenProgressFill: {
    backgroundColor: colors.goldMuted,
    borderRadius: 2,
    height: '100%',
  },

  SeasonsScreenDividerGap: {
    marginTop: spacing.l,
  },

  SeasonsScreenTaskList: {
    marginTop: spacing.l,
  },
});
