export interface IsFalsyOptions {
  /**
   * Check the whitespace and return false for `is.truthy`, true for `is.falsy`,
   * default false.
   */
  whitespace?: boolean;
}

/**
 * Javascript type checking
 *
 * @returns {boolean}
 *
 * @example
 *
 * ```ts
 * is.type({}, 'Object') === true
 * is.asyncFunction(async ()=>{})
 * is.null(null)
 *
 * ```
 */
export const is = {
  /**
   *
   * @param {unknown} obj
   * @param {string} str
   * @example
   * ```ts
   * is.type({}, 'Object') === true
   * ```
   */
  type(obj: unknown, str: string): boolean {
    return Object.prototype.toString.call(obj) === `[object ${str}]`;
  },
  string(obj: unknown): obj is string {
    return this.type(obj, 'String');
  },
  object(obj: unknown): obj is object {
    return this.type(obj, 'Object');
  },
  exactFunction(obj: unknown): obj is Function {
    return this.type(obj, 'Function');
  },
  /**
   *  typeof obj === 'function'
   */
  function(obj: unknown): obj is Function {
    return typeof obj === 'function';
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
  arrayBuffer(obj: unknown): obj is ArrayBuffer {
    return this.type(obj, 'ArrayBuffer');
  },
  symbol(obj: unknown): obj is Symbol {
    return this.type(obj, 'Symbol');
  },
  boolean(obj: unknown): obj is Boolean {
    return this.type(obj, 'Boolean');
  },
  truthy(obj: unknown, options?: IsFalsyOptions): boolean {
    return !this.falsy(obj, options);
  },
  falsy(obj: unknown, options?: IsFalsyOptions): boolean {
    options = Object.assign({}, { whitespace: false }, options);

    if (options.whitespace && !!obj && this.string(obj)) {
      return !!!(obj as string).trim();
    }

    return !!!obj;
  },
};
