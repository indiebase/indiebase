import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export function atomWithMutexArrayStorage(
  key: string,
  initialValue?: string[],
  storage?: any,
) {
  const anAtom = atomWithStorage<string[]>(key, initialValue, storage, {
    getOnInit: true,
  });
  const derivedAtom = atom(
    (get) => (key: string) => {
      return (get(anAtom) as string[]).includes(key);
    },
    async (get, set, nextValue?: string) => {
      const values = get(anAtom) as string[];
      if (values.includes(nextValue)) {
        values.splice(values.indexOf(nextValue), 1);
        void set(anAtom, values);
      } else {
        void set(anAtom, [...values, nextValue]);
      }
    },
  );

  return derivedAtom;
}
