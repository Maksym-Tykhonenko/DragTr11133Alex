import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AppNavigator} from './src/navigation/AppNavigator';
import {clearAllStorage} from './src/storage/keys';

const STORAGE_RESET_TOKEN = '2026-09-28';
const STORAGE_RESET_KEY = '@cft/storageReset';

function App(): React.JSX.Element {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const applied = await AsyncStorage.getItem(STORAGE_RESET_KEY);
        if (applied !== STORAGE_RESET_TOKEN) {
          await clearAllStorage();
          await AsyncStorage.setItem(STORAGE_RESET_KEY, STORAGE_RESET_TOKEN);
        }
      } finally {
        setReady(true);
      }
    })();
  }, []);

  if (!ready) {
    return <SafeAreaProvider>{null}</SafeAreaProvider>;
  }

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
