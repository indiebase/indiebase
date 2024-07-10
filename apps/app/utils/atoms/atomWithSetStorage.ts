import { type Atom, atom, useAtom, useSetAtom, type WritableAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type SetStorageType = string | number | boolean;

export interface AtomWithSetStorage {
  setAtom: ReturnType<typeof atomWithStorage>;
  concatAtom: WritableAtom<SetStorageType, [SetStorageType?], void>;
  removeAtom: WritableAtom<SetStorageType, [SetStorageType?], void>;
  hasAtom: Atom<(key: any) => boolean>;
}

export function atomWithSetStorage(
  key: string,
  initialValue?: string[],
  storage?: any,
): AtomWithSetStorage {
  const setAtom = atomWithStorage<SetStorageType[]>(
    key,
    initialValue,
    storage,
    {
      getOnInit: true,
    },
  );
  const concatAtom = atom<SetStorageType, [SetStorageType?], void>(
    null,
    async (get, set, nextValue?: SetStorageType) => {
      const values = get(setAtom) as SetStorageType[];
      if (values.includes(nextValue)) {
        values.splice(values.indexOf(nextValue), 1);
        void set(setAtom, values);
      } else {
        void set(setAtom, [...values, nextValue]);
      }
    },
  );
  const removeAtom = atom<SetStorageType, [SetStorageType?], void>(
    null,
    async (get, set, nextValue?: SetStorageType) => {
      const values = get(setAtom) as SetStorageType[];
      if (values.includes(nextValue)) {
        values.splice(values.indexOf(nextValue), 1);
        void set(setAtom, values);
      }
    },
  );

  const hasAtom = atom(
    (get) => (key) => (get(setAtom) as SetStorageType[]).includes(key),
  );

  return {
    setAtom,
    concatAtom,
    removeAtom,
    hasAtom,
  } as const;
}

export const useSetStorageAtom = function (atom: AtomWithSetStorage) {
  const [set] = useAtom(atom.setAtom);
  const concat = useSetAtom(atom.concatAtom);
  const remove = useSetAtom(atom.removeAtom);
  const [has] = useAtom(atom.hasAtom);

  return [
    set,
    {
      concat,
      remove,
      has,
    },
  ] as const;
};
