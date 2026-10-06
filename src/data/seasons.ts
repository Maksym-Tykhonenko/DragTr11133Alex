import type {ImageSourcePropType} from 'react-native';

import {seasonImages} from './assets';

export type SeasonId = 'spring' | 'summer' | 'autumn' | 'winter';

export type SeasonTask = {
  id: string;
  label: string;
};

export type Season = {
  id: SeasonId;
  tabLabel: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
  tasks: SeasonTask[];
};

export const SEASONS: Season[] = [
  {
    id: 'spring',
    tabLabel: 'Spring',
    title: 'Spring Maintenance',
    description:
      'Inspect the fireplace after winter and prepare it for the warmer months.',
    image: seasonImages.spring,
    tasks: [
      {id: 'spring-1', label: 'Remove all cooled ashes from the firebox'},
      {id: 'spring-2', label: 'Inspect the chimney after winter use'},
      {id: 'spring-3', label: 'Check for soot and sticky buildup'},
      {id: 'spring-4', label: 'Look for cracks or loose masonry'},
      {id: 'spring-5', label: 'Test smoke and carbon monoxide detectors'},
      {id: 'spring-6', label: 'Check the chimney cap and opening'},
      {id: 'spring-7', label: 'Clean the fireplace tools and screen'},
      {id: 'spring-8', label: 'Record the last cleaning date'},
    ],
  },
  {
    id: 'summer',
    tabLabel: 'Summer',
    title: 'Summer Maintenance',
    description:
      'Use the off-season to clean, repair, and organize the fireplace area.',
    image: seasonImages.summer,
    tasks: [
      {id: 'summer-1', label: 'Clean the firebox and surrounding surfaces'},
      {id: 'summer-2', label: 'Inspect the chimney liner'},
      {id: 'summer-3', label: 'Check the damper for proper movement'},
      {id: 'summer-4', label: 'Repair visible cracks or damaged parts'},
      {id: 'summer-5', label: 'Clean and store fireplace tools'},
      {id: 'summer-6', label: 'Prepare a dry place for firewood'},
      {id: 'summer-7', label: 'Check ventilation around the fireplace'},
      {id: 'summer-8', label: 'Review the home fire safety plan'},
    ],
  },
  {
    id: 'autumn',
    tabLabel: 'Autumn',
    title: 'Autumn Maintenance',
    description:
      'Prepare the chimney, firewood, and safety equipment before the heating season begins.',
    image: seasonImages.autumn,
    tasks: [
      {id: 'autumn-1', label: 'Schedule chimney cleaning'},
      {id: 'autumn-2', label: 'Arrange a professional inspection if needed'},
      {id: 'autumn-3', label: 'Test smoke and carbon monoxide detectors'},
      {id: 'autumn-4', label: 'Prepare dry seasoned firewood'},
      {id: 'autumn-5', label: 'Check the damper and chimney draft'},
      {id: 'autumn-6', label: 'Inspect the chimney cap'},
      {id: 'autumn-7', label: 'Clean the fireplace doors or screen'},
      {id: 'autumn-8', label: 'Remove flammable items from nearby areas'},
    ],
  },
  {
    id: 'winter',
    tabLabel: 'Winter',
    title: 'Winter Maintenance',
    description:
      'Keep the fireplace safe and efficient during regular winter use.',
    image: seasonImages.winter,
    tasks: [
      {id: 'winter-1', label: 'Remove excess ash regularly'},
      {id: 'winter-2', label: 'Keep the fire screen closed while burning'},
      {id: 'winter-3', label: 'Keep the damper open during active burning'},
      {id: 'winter-4', label: 'Avoid burning wet or treated wood'},
      {id: 'winter-5', label: 'Monitor smoke, smell, and flame behavior'},
      {id: 'winter-6', label: 'Check the fire before leaving the room'},
      {id: 'winter-7', label: 'Keep carbon monoxide detectors active'},
      {id: 'winter-8', label: 'Let ashes cool completely before disposal'},
    ],
  },
];
