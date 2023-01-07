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
