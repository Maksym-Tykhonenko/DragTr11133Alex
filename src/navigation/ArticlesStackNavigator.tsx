import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ArticleDetailScreen} from '../screens/ArticleDetailScreen';
import {ArticlesScreen} from '../screens/ArticlesScreen';
import type {ArticlesStackParamList} from './types';

const Stack = createNativeStackNavigator<ArticlesStackParamList>();

export function ArticlesStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ArticlesList" component={ArticlesScreen} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
    </Stack.Navigator>
  );
}
