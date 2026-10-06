import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {FirewoodCalculatorScreen} from '../screens/FirewoodCalculatorScreen';
import {FirewoodResultScreen} from '../screens/FirewoodResultScreen';
import type {FirewoodStackParamList} from './types';

const Stack = createNativeStackNavigator<FirewoodStackParamList>();

export function FirewoodStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FirewoodForm" component={FirewoodCalculatorScreen} />
      <Stack.Screen name="FirewoodResult" component={FirewoodResultScreen} />
    </Stack.Navigator>
  );
}
