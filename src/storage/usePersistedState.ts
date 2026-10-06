import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

import {loadJson, saveJson} from './keys';

export function usePersistedState<T>(
  key: string,
  initialValue: T,
): readonly [T, Dispatch<SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);
  const skipNextSave = useRef(true);

  useEffect(() => {
    let cancelled = false;

    loadJson<T>(key).then(stored => {
      if (cancelled) {
        return;
      }
      if (stored != null) {
        setValue(stored);
      }
      setHydrated(true);
    });

    return () => {
      cancelled = true;
    };
  }, [key]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    saveJson(key, value);
  }, [hydrated, key, value]);

  return [value, setValue, hydrated] as const;
}
