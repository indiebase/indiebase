export interface Resource {
  name: string;
  displayName?: string;
  description?: string;
  group?: boolean;
  children?: Resource[];
}
