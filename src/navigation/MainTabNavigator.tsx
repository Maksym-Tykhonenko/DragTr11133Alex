import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts, fontSize } from '../constants/theme';
import { tabIcons } from '../data/assets';
import { ChecklistScreen } from '../screens/ChecklistScreen';
import { SeasonsScreen } from '../screens/SeasonsScreen';
import { TimerScreen } from '../screens/TimerScreen';
import { ArticlesStackNavigator } from './ArticlesStackNavigator';
import { CheckStackNavigator } from './CheckStackNavigator';
import { FirewoodStackNavigator } from './FirewoodStackNavigator';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

type TabIconProps = {
  source: (typeof tabIcons)[keyof typeof tabIcons];
  focused: boolean;
  label: string;
};

function TabIcon({ source, focused, label }: TabIconProps) {
  return (
    <View style={styles.TabIconEnclave}>
      <Image
        source={source}
        style={[
          styles.TabIconSigil,
          { tintColor: focused ? colors.gold : colors.goldSoft },
        ]}
        resizeMode="contain"
      />
      <Text
        style={[
          styles.TabIconLabelFiligree,
          focused && styles.TabIconLabelActive,
        ]}
      >
        {label}
      </Text>
      {focused ? <View style={styles.TabIconActiveLintel} /> : null}
    </View>
  );
}

export function MainTabNavigator() {
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 8);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.TabBarFacetChassis,
          {
            height: 90,
            paddingBottom: bottomPad,
            paddingTop: 10,
          },
        ],
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.goldSoft,
      }}
    >
      <Tab.Screen
        name="ArticlesTab"
        component={ArticlesStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              source={tabIcons.articles}
              focused={focused}
              label="Articles"
            />
          ),
        }}
      />
      <Tab.Screen
        name="SeasonsTab"
        component={SeasonsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              source={tabIcons.seasons}
              focused={focused}
              label="Seasons"
            />
          ),
        }}
      />
      <Tab.Screen
        name="CheckTab"
        component={CheckStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon source={tabIcons.check} focused={focused} label="Check" />
          ),
        }}
      />
      <Tab.Screen
        name="ChecklistTab"
        component={ChecklistScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              source={tabIcons.checklist}
              focused={focused}
              label="Checklist"
            />
          ),
        }}
      />
      <Tab.Screen
        name="TimerTab"
        component={TimerScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon source={tabIcons.timer} focused={focused} label="Timer" />
          ),
        }}
      />
      <Tab.Screen
        name="FirewoodTab"
        component={FirewoodStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              source={tabIcons.firewood}
              focused={focused}
              label="Firewood"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  TabBarFacetChassis: {
    backgroundColor: colors.tabBar,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    paddingTop: 4,
  },
  TabIconEnclave: {
    alignItems: 'center',
    gap: 3,
    minWidth: 56,
    paddingTop: 8,
  },

  TabIconSigil: {
    height: 22,
    width: 22,
  },

  TabIconLabelFiligree: {
    color: colors.goldSoft,
    fontFamily: fonts.sansRegular,
    fontSize: fontSize.tab,
    letterSpacing: 0.3,
    lineHeight: 15,
  },

  TabIconLabelActive: {
    color: colors.gold,
    fontFamily: fonts.sansSemiBold,
    fontWeight: '600',
  },

  TabIconActiveLintel: {
    backgroundColor: colors.gold,
    borderRadius: 1,
    height: 2,
    marginTop: 1,
    width: 24,
  },
});
