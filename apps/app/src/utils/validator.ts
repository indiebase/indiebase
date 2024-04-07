export const isCommonLegalString = (value: string) =>
  !/[^a-zA-Z0-9-_]/g.test(value);
