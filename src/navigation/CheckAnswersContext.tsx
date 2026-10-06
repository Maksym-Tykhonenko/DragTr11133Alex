import React, {createContext, useContext, useMemo} from 'react';

import {storageKeys} from '../storage/keys';
import {usePersistedState} from '../storage/usePersistedState';

type CheckAnswersContextValue = {
  answers: Record<string, string>;
  setAnswer: (questionId: string, optionId: string) => void;
  resetAnswers: () => void;
};

const CheckAnswersContext = createContext<CheckAnswersContextValue | null>(
  null,
);

export function CheckAnswersProvider({children}: {children: React.ReactNode}) {
  const [answers, setAnswers] = usePersistedState<Record<string, string>>(
    storageKeys.checkAnswers,
    {},
  );

  const value = useMemo<CheckAnswersContextValue>(
    () => ({
      answers,
      setAnswer: (questionId, optionId) => {
        setAnswers(prev => ({...prev, [questionId]: optionId}));
      },
      resetAnswers: () => setAnswers({}),
    }),
    [answers, setAnswers],
  );

  return (
    <CheckAnswersContext.Provider value={value}>
      {children}
    </CheckAnswersContext.Provider>
  );
}

export function useCheckAnswers() {
  const context = useContext(CheckAnswersContext);
  if (!context) {
    throw new Error('useCheckAnswers must be used within CheckAnswersProvider');
  }
  return context;
}
