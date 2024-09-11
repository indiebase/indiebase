export function save(filename: string, data: string) {
  const blob = new Blob([data], { type: 'text/plain;charset=UTF-8' });
  const elem = window.document.createElement('a');
  elem.href = window.URL.createObjectURL(blob);
  elem.download = filename;
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
}

export const validator = {
  isNormalString: (value) => !/[^a-zA-Z0-9-_]/g.test(value),
  isDomain: (message?: string) => (value) =>
    /(?:^\w+|\w+\.\w+)+$/.test(value) ? null : message,
  isLegalName: (message?: string) => (value: string) =>
    !/[^a-zA-Z0-9-_]|^$/g.test(value) ? null : message,
};
