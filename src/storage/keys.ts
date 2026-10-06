import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageKeys = {
  checklistTasks: '@cft/checklistTasks',
  seasonsCompletion: '@cft/seasonsCompletion',
  seasonsActiveId: '@cft/seasonsActiveId',
  timer: '@cft/timer',
  checkAnswers: '@cft/checkAnswers',
  firewoodForm: '@cft/firewoodForm',
} as const;

export async function loadJson<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw == null) {
      return null;
    }
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function saveJson<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore persistence failures; UI stays responsive.
  }
}

export async function clearAllStorage(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch {
    // Ignore persistence failures; UI stays responsive.
  }
}
