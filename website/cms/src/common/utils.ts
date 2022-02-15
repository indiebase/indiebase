import { useReducer } from 'react';

export const is = {
  type(obj: unknown, str: string): boolean {
    return Object.prototype.toString.call(obj) === `[object ${str}]`;
  },
  string(obj: unknown): obj is string {
    return this.type(obj, 'String');
  },
  object(obj: unknown): obj is object {
    return this.type(obj, 'Object');
  },
  function(obj: unknown): obj is Function {
    return this.type(obj, 'Function');
  },
  asyncFunction(obj: unknown): obj is Function {
    return this.type(obj, 'AsyncFunction');
  },
  null(obj: unknown): obj is null {
    return this.type(obj, 'Null');
  },
  undefined(obj: unknown): obj is undefined {
    return this.type(obj, 'Undefined');
  },
  number(obj: unknown): obj is number {
    return this.type(obj, 'Number');
  },
  array(obj: unknown): obj is [] {
    return this.type(obj, 'Array');
  },
  boolean(obj: unknown): obj is boolean {
    return this.type(obj, 'Boolean');
  },
};

export const regexps = {
  uri: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/,
  androidPackage: /^([A-Za-z]{1}[A-Za-z\d_]*\.)+[A-Za-z][A-Za-z\d_]*$/,
  email: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  space: /^[^\s]*$/,
  posixPath: /^(\/[^/]*)+\/?$/,
};
