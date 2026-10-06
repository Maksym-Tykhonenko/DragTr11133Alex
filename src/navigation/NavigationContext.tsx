import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import type {AppPhase} from './types';

type NavigationContextValue = {
  phase: AppPhase;
  finishLoader: () => void;
  finishOnboarding: () => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({children}: {children: React.ReactNode}) {
  const [phase, setPhase] = useState<AppPhase>('Loader');

  const finishLoader = useCallback(() => {
    setPhase('Onboarding');
  }, []);

  const finishOnboarding = useCallback(() => {
    setPhase('Main');
  }, []);

  const value = useMemo(
    () => ({
      phase,
      finishLoader,
      finishOnboarding,
    }),
    [phase, finishLoader, finishOnboarding],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useAppNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useAppNavigation must be used within NavigationProvider');
  }
  return context;
}
