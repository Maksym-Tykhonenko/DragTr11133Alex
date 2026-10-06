import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { GoldDivider } from '../components/onboarding/GoldDivider';
import {
  colors,
  fonts,
  fontSize,
  layout,
  radius,
  spacing,
} from '../constants/theme';
import { icons, timerImages } from '../data/assets';
import { loadJson, saveJson, storageKeys } from '../storage/keys';

const DEFAULT_DURATION_SECONDS = 2 * 60 * 60;
const monoFont = Platform.OS === 'ios' ? 'Menlo' : 'monospace';

type TimerPersisted = {
  durationSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
  endsAt: number | null;
};

function clampInt(value: string, min: number, max: number) {
  const parsed = Number.parseInt(value.replace(/[^0-9]/g, ''), 10);
  if (Number.isNaN(parsed)) {
    return min;
  }
  return Math.min(max, Math.max(min, parsed));
}

function formatTime(totalSeconds: number) {
  const safe = Math.max(0, totalSeconds);
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  return [hours, minutes, seconds]
    .map(part => String(part).padStart(2, '0'))
    .join(':');
}

export function TimerScreen() {
  const insets = useSafeAreaInsets();
  const hydratedRef = useRef(false);
  const [durationSeconds, setDurationSeconds] = useState(
    DEFAULT_DURATION_SECONDS,
  );
  const [remainingSeconds, setRemainingSeconds] = useState(
    DEFAULT_DURATION_SECONDS,
  );
  const [isRunning, setIsRunning] = useState(false);
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [draftHours, setDraftHours] = useState('2');
  const [draftMinutes, setDraftMinutes] = useState('0');

  useEffect(() => {
    let cancelled = false;

    loadJson<TimerPersisted>(storageKeys.timer).then(stored => {
      if (cancelled || !stored) {
        hydratedRef.current = true;
        return;
      }

      const nextDuration =
        stored.durationSeconds > 0
          ? stored.durationSeconds
          : DEFAULT_DURATION_SECONDS;
      let nextRemaining = Math.max(0, stored.remainingSeconds);
      let nextRunning = Boolean(stored.isRunning);
      let nextEndsAt = stored.endsAt;

      if (nextRunning && nextEndsAt) {
        nextRemaining = Math.max(
          0,
          Math.ceil((nextEndsAt - Date.now()) / 1000),
        );
        nextRunning = nextRemaining > 0;
        if (!nextRunning) {
          nextEndsAt = null;
        }
      } else {
        nextRunning = false;
        nextEndsAt = null;
      }

      setDurationSeconds(nextDuration);
      setRemainingSeconds(nextRemaining);
      setIsRunning(nextRunning);
      setEndsAt(nextEndsAt);
      hydratedRef.current = true;
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) {
      return;
    }

    const payload: TimerPersisted = {
      durationSeconds,
      remainingSeconds,
      isRunning,
      endsAt,
    };
    saveJson(storageKeys.timer, payload);
  }, [durationSeconds, remainingSeconds, isRunning, endsAt]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const id = setInterval(() => {
      setRemainingSeconds(prev => {
        const next =
          endsAt != null
            ? Math.max(0, Math.ceil((endsAt - Date.now()) / 1000))
            : prev - 1;
        if (next <= 0) {
          setIsRunning(false);
          setEndsAt(null);
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, endsAt]);

  const statusLabel = isRunning ? 'RUNNING' : 'PAUSED';
  const timeLabel = formatTime(remainingSeconds);

  const openDurationSheet = () => {
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    setDraftHours(String(hours));
    setDraftMinutes(String(minutes));
    setSheetVisible(true);
  };

  const handleSaveDuration = () => {
    const hours = clampInt(draftHours, 0, 23);
    const minutes = clampInt(draftMinutes, 0, 59);
    const next = hours * 3600 + minutes * 60;
    const safeDuration = next > 0 ? next : 60;
    setDurationSeconds(safeDuration);
    setRemainingSeconds(safeDuration);
    setIsRunning(false);
    setEndsAt(null);
    setSheetVisible(false);
  };

  const handleStartPause = () => {
    if (isRunning) {
      setIsRunning(false);
      setEndsAt(null);
      return;
    }

    const startFrom =
      remainingSeconds <= 0 ? durationSeconds : remainingSeconds;
    setRemainingSeconds(startFrom);
    setEndsAt(Date.now() + startFrom * 1000);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setEndsAt(null);
    setRemainingSeconds(durationSeconds);
  };

  const handleSimulateEnd = () => {
    setIsRunning(false);
    setEndsAt(null);
    setRemainingSeconds(0);
  };

  const primaryLabel = isRunning ? 'Pause' : 'Start';

  const sheetPaddingBottom = useMemo(
    () => Math.max(insets.bottom, 24) + 16,
    [insets.bottom],
  );

  return (
    <View style={[styles.TimerScreenFacetChassis, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.TimerScreenHeaderEnclave}>
        <Text style={styles.TimerScreenTitleFiligree}>
          Fireplace Safety Timer
        </Text>
        <Pressable
          onPress={openDurationSheet}
          hitSlop={8}
          style={styles.TimerScreenEditPortico}
          accessibilityRole="button"
          accessibilityLabel="Set timer duration"
        >
          <Image source={icons.edit} style={styles.TimerScreenEditSigil} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.TimerScreenScroll}
        contentContainerStyle={styles.TimerScreenScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.TimerScreenDisplayCard,
            isRunning && styles.TimerScreenDisplayCardRunning,
          ]}
        >
          <Text
            style={[
              styles.TimerScreenTimeFiligree,
              isRunning && styles.TimerScreenTimeRunning,
            ]}
          >
            {timeLabel}
          </Text>
          <View style={styles.TimerScreenStatusRow}>
            <View
              style={[
                styles.TimerScreenStatusDot,
                isRunning && styles.TimerScreenStatusDotRunning,
              ]}
            />
            <Text
              style={[
                styles.TimerScreenStatusFiligree,
                isRunning && styles.TimerScreenStatusRunning,
              ]}
            >
              {statusLabel}
            </Text>
          </View>
        </View>

        <Text style={styles.TimerScreenBodyFiligree}>
          The safety timer reminds you to check the fire, damper, and remaining
          embers before leaving the room or going to sleep.
        </Text>

        <View style={styles.TimerScreenActionsRow}>
          {isRunning ? (
            <Pressable
              onPress={handleStartPause}
              style={({ pressed }) => [
                styles.TimerScreenPauseBtn,
                pressed && styles.TimerScreenBtnPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Pause timer"
            >
              <Text style={styles.TimerScreenPauseLabelFiligree}>
                {primaryLabel}
              </Text>
            </Pressable>
          ) : (
            <View style={styles.TimerScreenActionHalf}>
              <PrimaryButton label={primaryLabel} onPress={handleStartPause} />
            </View>
          )}
          <Pressable
            onPress={handleReset}
            style={({ pressed }) => [
              styles.TimerScreenResetBtn,
              pressed && styles.TimerScreenBtnPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Reset timer"
          >
            <Text style={styles.TimerScreenResetLabelFiligree}>Reset</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={handleSimulateEnd}
          style={styles.TimerScreenSimulatePortico}
          accessibilityRole="button"
          accessibilityLabel="Simulate timer end"
        >
          <Text style={styles.TimerScreenSimulateFiligree}>
            Simulate timer end →
          </Text>
        </Pressable>

        <Image
          source={timerImages.hero}
          style={styles.TimerScreenHeroSigil}
          resizeMode="cover"
        />
      </ScrollView>

      <Modal
        visible={sheetVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSheetVisible(false)}
      >
        <View style={styles.TimerScreenSheetRoot}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setSheetVisible(false)}
            accessibilityRole="button"
            accessibilityLabel="Dismiss duration sheet"
          />
          <View
            style={[
              styles.TimerScreenSheetChassis,
              { paddingBottom: sheetPaddingBottom },
            ]}
          >
            <Text style={styles.TimerScreenSheetTitleFiligree}>
              Set Timer Duration
            </Text>
            <View style={styles.TimerScreenSheetDividerGap}>
              <GoldDivider />
            </View>

            <View style={styles.TimerScreenDurationRow}>
              <View style={styles.TimerScreenDurationField}>
                <Text style={styles.TimerScreenDurationLabelFiligree}>
                  Hours
                </Text>
                <TextInput
                  value={draftHours}
                  onChangeText={setDraftHours}
                  keyboardType="number-pad"
                  maxLength={2}
                  style={styles.TimerScreenDurationInput}
                  placeholderTextColor={colors.body}
                  accessibilityLabel="Hours"
                />
              </View>
              <View style={styles.TimerScreenDurationField}>
                <Text style={styles.TimerScreenDurationLabelFiligree}>
                  Minutes
                </Text>
                <TextInput
                  value={draftMinutes}
                  onChangeText={setDraftMinutes}
                  keyboardType="number-pad"
                  maxLength={2}
                  style={styles.TimerScreenDurationInput}
                  placeholderTextColor={colors.body}
                  accessibilityLabel="Minutes"
                />
              </View>
            </View>

            <View style={styles.TimerScreenSheetActions}>
              <Pressable
                onPress={() => setSheetVisible(false)}
                style={({ pressed }) => [
                  styles.TimerScreenCancelBtn,
                  pressed && styles.TimerScreenBtnPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Cancel"
              >
                <Text style={styles.TimerScreenCancelLabelFiligree}>
                  Cancel
                </Text>
              </Pressable>
              <View style={styles.TimerScreenSaveWrap}>
                <PrimaryButton label="Save" onPress={handleSaveDuration} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  TimerScreenFacetChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },

  TimerScreenHeaderEnclave: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing.l,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
  },
  TimerScreenTitleFiligree: {
    color: colors.cream,
    flex: 1,
    fontFamily: fonts.cinzelBold,
    fontSize: 17,
    letterSpacing: 0.68,
    lineHeight: 25.5,
    textTransform: 'uppercase',
  },

  TimerScreenEditPortico: {},

  TimerScreenEditSigil: {},

  TimerScreenScroll: {
    flex: 1,
  },

  TimerScreenScrollContent: {
    alignItems: 'center',
    paddingBottom: spacing.xxxl,
    paddingHorizontal: spacing.screen,
    paddingTop: 28,
  },
  TimerScreenDisplayCard: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: layout.timerDisplayHeight,
    overflow: 'hidden',
    paddingHorizontal: spacing.screen,
    paddingVertical: 36,
    width: '100%',
  },

  TimerScreenDisplayCardRunning: {
    backgroundColor: '#1f1818',
  },

  TimerScreenTimeFiligree: {
    color: colors.cream,
    fontFamily: monoFont,
    fontSize: 52,
    letterSpacing: 2.08,
    lineHeight: 52,
    textAlign: 'center',
  },
  TimerScreenTimeRunning: {
    color: colors.goldBright,
  },

  TimerScreenStatusRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    marginTop: spacing.m,
  },
  TimerScreenStatusDot: {
    backgroundColor: colors.checked,
    borderRadius: 3,
    height: 6,
    width: 6,
  },

  TimerScreenStatusDotRunning: {
    backgroundColor: colors.gold,
  },

  TimerScreenStatusFiligree: {
    color: colors.checked,
    fontFamily: fonts.sansRegular,
    fontSize: 11,
    letterSpacing: 1.1,
    lineHeight: 16.5,
    textAlign: 'center',
  },

  TimerScreenStatusRunning: {
    color: colors.gold,
  },
  TimerScreenBodyFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: fontSize.subtitle,
    lineHeight: 21.45,
    marginTop: spacing.xl,
    textAlign: 'center',
    width: '100%',
  },

  TimerScreenActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 28,
    width: '100%',
  },

  TimerScreenActionHalf: {
    flex: 1,
  },

  TimerScreenPauseBtn: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.goldMuted,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    height: layout.buttonHeight,
    justifyContent: 'center',
  },

  TimerScreenPauseLabelFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansSemiBold,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },

  TimerScreenResetBtn: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    height: layout.buttonHeight,
    justifyContent: 'center',
  },
  TimerScreenResetLabelFiligree: {
    color: colors.body,
    fontFamily: fonts.sansMedium,
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },

  TimerScreenBtnPressed: {
    opacity: 0.85,
  },
  TimerScreenSimulatePortico: {
    marginTop: spacing.m,
    paddingVertical: 6,
  },

  TimerScreenSimulateFiligree: {
    color: colors.checked,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    letterSpacing: 0.6,
    lineHeight: 18,
    textAlign: 'center',
  },

  TimerScreenHeroSigil: {
    borderRadius: radius.image,
    height: layout.timerHeroSize,
    marginTop: spacing.xl,
    width: layout.timerHeroSize,
  },

  TimerScreenSheetRoot: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  TimerScreenSheetChassis: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderTopWidth: 1,
    paddingHorizontal: spacing.screen,
    paddingTop: 28,
    zIndex: 1,
  },

  TimerScreenSheetTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.cinzelBold,
    fontSize: 17,
    lineHeight: 25.5,
    textTransform: 'uppercase',
  },

  TimerScreenSheetDividerGap: {
    marginTop: 6,
  },
  TimerScreenDurationRow: {
    flexDirection: 'row',
    gap: spacing.l,
    marginTop: spacing.xxxl - 8,
  },

  TimerScreenDurationField: {
    flex: 1,
  },
  TimerScreenDurationLabelFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    letterSpacing: 0.96,
    lineHeight: 18,
    marginBottom: 8,
    textTransform: 'uppercase',
  },

  TimerScreenDurationInput: {
    backgroundColor: colors.border,
    borderColor: colors.goldMuted,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.cream,
    fontFamily: monoFont,
    fontSize: 20,
    height: 56,
    textAlign: 'center',
  },

  TimerScreenSheetActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 28,
  },
  TimerScreenCancelBtn: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    height: layout.buttonHeight,
    justifyContent: 'center',
  },

  TimerScreenCancelLabelFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  TimerScreenSaveWrap: {
    flex: 2,
  },
});
