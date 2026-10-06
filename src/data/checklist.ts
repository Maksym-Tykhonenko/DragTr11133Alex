export type ChecklistTask = {
  id: string;
  label: string;
  completed: boolean;
};

export const DEFAULT_CHECKLIST_TASKS: ChecklistTask[] = [
  {id: 'clean-1', label: 'Let the fireplace cool completely', completed: true},
  {id: 'clean-2', label: 'Prepare gloves and cleaning tools', completed: true},
  {id: 'clean-3', label: 'Remove cooled ashes', completed: true},
  {id: 'clean-4', label: 'Clean the firebox', completed: true},
  {id: 'clean-5', label: 'Check and clean the grate', completed: false},
  {id: 'clean-6', label: 'Inspect the damper', completed: false},
  {id: 'clean-7', label: 'Check the chimney opening', completed: false},
  {id: 'clean-8', label: 'Record the cleaning date', completed: false},
];
