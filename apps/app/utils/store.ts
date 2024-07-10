import { is } from '@deskbtm/gadgets/is';

type StoreType = object | string | number | StoreType[];

export class LocalStore {
  static set<T extends StoreType>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static assign<T extends object>(key: string, value: T) {
    const v = this.get(key);

    void this.set(key, v ? Object.assign({}, v, value) : value);
  }

  static concat<T extends StoreType>(
    key: string,
    value: T,
    options?: { duplicate?: boolean },
  ) {
    const { duplicate } = Object.assign({}, { duplicate: false }, options);
    let v = this.get<T[]>(key);
    if (!Array.isArray(v)) {
      v = Array.of();
    }

    if (!duplicate && v.includes(value)) {
      return;
    }

    void this.set(key, v.length > 0 ? v.concat(value) : Array.of(value));
  }

  static get<T extends StoreType>(
    key: string,
    fallback?: Record<string, unknown>,
  ): T {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? ((fallback ?? {}) as T);
    } catch (error) {
      return {} as T;
    }
  }

  static remove<T extends string | number>(key, value?: T) {
    const v = this.get(key);

    if (value) {
      if (Array.isArray(v)) {
        v.splice(v.indexOf(value), 1);
      }

      if (is.object(v) && Object.prototype.hasOwnProperty.call(v, key)) {
        Reflect.deleteProperty(v, key);
      }

      void this.set(key, v);
    } else {
      localStorage.removeItem(key);
    }
  }
}
