declare type Fn = (...args: any[]) => any;
export declare type AnyClass<ReturnType = any> = new (
  ...args: any[]
) => ReturnType;
declare type AnyRecord = Record<PropertyKey, any>;
export declare type AnyObject = Record<PropertyKey, unknown>;
export declare type SubjectClass<N extends string = string> = AnyClass & {
  modelName?: N;
};
export declare type SubjectType = string | SubjectClass;
export declare type Subject = AnyRecord | SubjectType;
export declare type AbilityTuple<
  X extends string = string,
  Y extends Subject = Subject,
> = [X, Y];
export declare type Abilities = AbilityTuple | string;
export declare type ToAbilityTypes<T extends Abilities> = T extends AbilityTuple
  ? AbilityTupleType<T[0], ExtractSubjectType<T[1]>>
  : Extract<T, string>;
export declare type AbilityTupleType<
  T extends string = string,
  U extends SubjectType = SubjectType,
> = [T, U];
export declare type AbilityTypes = string | AbilityTupleType;
export declare type Normalize<T extends Abilities> = T extends AbilityTuple
  ? T
  : [T, string];
export declare type IfString<T, U> = T extends string ? U : never;
export declare type AbilityParameters<
  T extends Abilities,
  TupleFunction extends Fn,
  StringFunction extends Fn = () => 0,
  Else = IfString<T, Parameters<StringFunction>>,
> = T extends AbilityTuple ? Parameters<TupleFunction> : Else;
export declare type CanParameters<
  T extends Abilities,
  IncludeField extends boolean = true,
> = AbilityParameters<
  T,
  T extends AbilityTuple
    ? IncludeField extends true
      ? (action: T[0], subject: T[1], field?: string) => 0
      : (action: T[0], subject: T[1]) => 0
    : never,
  (action: Extract<T, string>) => 0
>;
export declare type ExtractSubjectType<S extends Subject> =
  | Extract<S, SubjectType>
  | TagName<S>;
declare type SubjectClassWithCustomName<T> = AnyClass & {
  modelName: T;
};
export declare type InferSubjects<T, IncludeTagName extends boolean = false> =
  | T
  | (T extends AnyClass<infer I>
      ?
          | I
          | (IncludeTagName extends true
              ? T extends SubjectClassWithCustomName<infer Name>
                ? Name
                : TagName<I>
              : never)
      : TagName<T>);
export interface ForcedSubject<T> {
  readonly __caslSubjectType__: T;
}
export declare type TaggedInterface<T extends string> =
  | ForcedSubject<T>
  | {
      readonly kind: T;
    }
  | {
      readonly __typename: T;
    };
declare type TagName<T> = T extends TaggedInterface<infer U> ? U : never;

export declare type MatchField<T extends string> = (field: T) => boolean;
export declare type FieldMatcher = <T extends string>(
  fields: T[],
) => MatchField<T>;
export declare type AliasesMap = Record<string, string | string[]>;
export {};
