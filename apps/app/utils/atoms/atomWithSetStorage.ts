import { type Atom, atom, useAtom, useSetAtom, type WritableAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type SetStorageType = string | number | boolean;

export interface AtomWithSetStorage {
  setAtom: any;
  addAtom: WritableAtom<null, [(SetStorageType | SetStorageType[])?], void>;
  removeAtom: WritableAtom<null, [(SetStorageType | 'all')?], void>;
  clearAtom: WritableAtom<null, [unknown?], void>;
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

  const addAtom = atom<null, [(SetStorageType | SetStorageType[])?], void>(
    null,
    async (get, set, nextValue?: SetStorageType | SetStorageType[]) => {
      const values = get(setAtom) as SetStorageType[];

      if (Array.isArray(nextValue)) {
        void set(setAtom, Array.from(new Set([...values, ...nextValue])));
        return;
      }

      if (!values.includes(nextValue)) {
        void set(setAtom, [...values, nextValue]);
      }
    },
  );
  const removeAtom = atom<null, [SetStorageType?], void>(
    null,
    async (get, set, nextValue?: SetStorageType) => {
      const values = get(setAtom) as SetStorageType[];

      if (values.includes(nextValue)) {
        values.splice(values.indexOf(nextValue), 1);
        void set(setAtom, [...values]);
      }
    },
  );
  const clearAtom = atom<null, [SetStorageType?], void>(
    null,
    async (_get, set) => {
      void set(setAtom, []);
    },
  );

  const hasAtom = atom((get) => (key) => {
    return (get(setAtom) as SetStorageType[]).includes(key);
  });

  return {
    setAtom,
    addAtom,
    removeAtom,
    hasAtom,
    clearAtom,
  } as const;
}

export const useSetStorageAtom = function (atom: AtomWithSetStorage) {
  const [data] = useAtom<SetStorageType[]>(atom.setAtom);
  const add = useSetAtom(atom.addAtom);
  const remove = useSetAtom(atom.removeAtom);
  const clear = useSetAtom(atom.clearAtom);
  const [has] = useAtom(atom.hasAtom);

  return [
    data,
    {
      add,
      remove,
      has,
      clear,
    },
  ] as const;
};
