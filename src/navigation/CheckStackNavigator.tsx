import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {CheckIntroScreen} from '../screens/CheckIntroScreen';
import {CheckQuestionScreen} from '../screens/CheckQuestionScreen';
import {CheckResultScreen} from '../screens/CheckResultScreen';
import {CheckAnswersProvider} from './CheckAnswersContext';
import type {CheckStackParamList} from './types';

const Stack = createNativeStackNavigator<CheckStackParamList>();

export function CheckStackNavigator() {
  return (
    <CheckAnswersProvider>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="CheckIntro" component={CheckIntroScreen} />
        <Stack.Screen name="CheckQuestion" component={CheckQuestionScreen} />
        <Stack.Screen name="CheckResult" component={CheckResultScreen} />
      </Stack.Navigator>
    </CheckAnswersProvider>
  );
}
