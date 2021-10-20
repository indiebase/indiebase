export interface PassportControlConstructor {
  new (): PassportControl;
}
export abstract class PassportControl {
  public abstract name: string;
  public abstract inspect(...args: any[]): void;
  public abstract onError(...args: any[]): void;
}

