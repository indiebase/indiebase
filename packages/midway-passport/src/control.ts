export interface PassportControlConstructor {
  new (): PassportControl;
}
export abstract class PassportControl {
  public abstract name: string;
  public abstract auth(...args: any[]): Promise<Record<string, any>>;
  public abstract onError(...args: any[]): void;
}
