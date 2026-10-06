import React, {useRef, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {SeasonTaskRow} from '../components/seasons/SeasonTaskRow';
import {colors, fonts, fontSize, layout, spacing} from '../constants/theme';
import {
  DEFAULT_CHECKLIST_TASKS,
  type ChecklistTask,
} from '../data/checklist';
import {storageKeys} from '../storage/keys';
import {usePersistedState} from '../storage/usePersistedState';

export function ChecklistScreen() {
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [tasks, setTasks] = usePersistedState<ChecklistTask[]>(
    storageKeys.checklistTasks,
    DEFAULT_CHECKLIST_TASKS,
  );
  const [draft, setDraft] = useState('');
  const [inputFocused, setInputFocused] = useState(false);

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const percent =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  const canAdd = draft.trim().length > 0;
  const showCustomAddCta = inputFocused && !canAdd;

  const toggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? {...task, completed: !task.completed} : task,
      ),
    );
  };

  const handleAddTask = () => {
    const label = draft.trim();
    if (!label) {
      return;
    }

    setTasks(prev => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        label,
        completed: false,
      },
    ]);
    setDraft('');
  };

  const handleCustomAddPress = () => {
    inputRef.current?.focus();
  };

  return (
    <View
      style={[styles.ChecklistScreenFacetChassis, {paddingTop: insets.top}]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.ChecklistScreenHeaderEnclave}>
        <Text style={styles.ChecklistScreenTitleFiligree}>
          Cleaning Checklist
        </Text>
        <View style={styles.ChecklistScreenProgressEnclave}>
          <View style={styles.ChecklistScreenProgressMeta}>
            <Text style={styles.ChecklistScreenProgressCountFiligree}>
              {completedCount} of {totalCount} completed
            </Text>
            <Text style={styles.ChecklistScreenProgressPercentFiligree}>
              {percent}%
            </Text>
          </View>
          <View style={styles.ChecklistScreenProgressTrack}>
            <View
              style={[
                styles.ChecklistScreenProgressFill,
                {width: `${percent}%`},
              ]}
            />
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.ChecklistScreenScroll}
        contentContainerStyle={styles.ChecklistScreenScrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.ChecklistScreenTaskList}>
          {tasks.map((task, index) => (
            <SeasonTaskRow
              key={task.id}
              label={task.label}
              checked={task.completed}
              isLast={index === tasks.length - 1}
              onToggle={() => toggleTask(task.id)}
            />
          ))}
        </View>

        <View style={styles.ChecklistScreenComposerEnclave}>
          <TextInput
            ref={inputRef}
            value={draft}
            onChangeText={setDraft}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="Type here..."
            placeholderTextColor={colors.white}
            style={[
              styles.ChecklistScreenDraftInput,
              inputFocused && styles.ChecklistScreenDraftInputFocused,
            ]}
            returnKeyType="done"
            onSubmitEditing={handleAddTask}
            accessibilityLabel="Custom checklist task"
          />
          {showCustomAddCta ? (
            <Pressable
              onPress={handleCustomAddPress}
              style={({pressed}) => [
                styles.ChecklistScreenAddCustomBtn,
                pressed && styles.ChecklistScreenAddCustomPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Add custom task">
              <Text style={styles.ChecklistScreenAddCustomFiligree}>
                + Add Custom Task
              </Text>
            </Pressable>
          ) : (
            <PrimaryButton
              label="Add Task"
              onPress={handleAddTask}
              disabled={!canAdd}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ChecklistScreenFacetChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },

  ChecklistScreenHeaderEnclave: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: spacing.l,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
  },

  ChecklistScreenTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.cinzelBold,
    fontSize: fontSize.screenTitle,
    letterSpacing: 1.08,
    lineHeight: 27,
    textTransform: 'uppercase',
  },
  ChecklistScreenProgressEnclave: {
    marginTop: spacing.m,
  },

  ChecklistScreenProgressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  ChecklistScreenProgressCountFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: fontSize.step,
    lineHeight: 18,
  },

  ChecklistScreenProgressPercentFiligree: {
    color: colors.gold,
    fontFamily: fonts.sansRegular,
    fontSize: fontSize.step,
    lineHeight: 18,
  },

  ChecklistScreenProgressTrack: {
    backgroundColor: colors.border,
    borderRadius: 2,
    height: layout.progressBarHeight,
    marginTop: 6,
    overflow: 'hidden',
    width: '100%',
  },
  ChecklistScreenProgressFill: {
    backgroundColor: colors.goldMuted,
    borderRadius: 2,
    height: '100%',
  },

  ChecklistScreenScroll: {
    flex: 1,
  },
  ChecklistScreenScrollContent: {
    paddingBottom: spacing.xxxl,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.m,
  },

  ChecklistScreenTaskList: {
    width: '100%',
  },

  ChecklistScreenComposerEnclave: {
    gap: 14,
    marginTop: spacing.m,
    width: '100%',
  },

  ChecklistScreenDraftInput: {
    backgroundColor: '#323232',
    borderColor: colors.checked,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    color: colors.white,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    fontStyle: 'italic',
    height: layout.buttonHeight,
    letterSpacing: 0.28,
    paddingHorizontal: 17,
  },

  ChecklistScreenDraftInputFocused: {
    backgroundColor: colors.checked,
  },
  ChecklistScreenAddCustomBtn: {
    alignItems: 'center',
    borderColor: colors.checked,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    height: layout.buttonHeight,
    justifyContent: 'center',
    width: '100%',
  },

  ChecklistScreenAddCustomPressed: {
    opacity: 0.85,
  },
  ChecklistScreenAddCustomFiligree: {
    color: colors.checked,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    letterSpacing: 0.28,
    lineHeight: 21,
  },
});
