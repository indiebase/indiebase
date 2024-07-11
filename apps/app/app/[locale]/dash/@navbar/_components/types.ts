export interface NavMenuItem {
  href: string;
  label: string;
  leftSection?: JSX.Element;
  children?: NavMenuItem[];
}
