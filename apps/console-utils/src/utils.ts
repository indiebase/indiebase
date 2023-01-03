export const is = {
  type(obj: unknown, str: string): boolean {
    return Object.prototype.toString.call(obj) === `[object ${str}]`;
  },
  // string(obj: unknown): obj is string {
  //   return this.type(obj, 'String');
  // },
  // object(obj: unknown): obj is object {
  //   return this.type(obj, 'Object');
  // },
  // function(obj: unknown): obj is Function {
  //   return this.type(obj, 'Function');
  // },
  // asyncFunction(obj: unknown): obj is Function {
  //   return this.type(obj, 'AsyncFunction');
  // },
  // null(obj: unknown): obj is null {
  //   return this.type(obj, 'Null');
  // },
  // undefined(obj: unknown): obj is undefined {
  //   return this.type(obj, 'Undefined');
  // },
  // number(obj: unknown): obj is number {
  //   return this.type(obj, 'Number');
  // },
  // array(obj: unknown): obj is [] {
  //   return this.type(obj, 'Array');
  // },
  boolean(obj: unknown): obj is boolean {
    return this.type(obj, 'Boolean');
  },
};

export function save(filename: string, data: string) {
  const blob = new Blob([data], { type: 'text/plain;charset=UTF-8' });
  const elem = window.document.createElement('a');
  elem.href = window.URL.createObjectURL(blob);
  elem.download = filename;
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
}

export const isEmail = (value) =>
  /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(
    value,
  );
