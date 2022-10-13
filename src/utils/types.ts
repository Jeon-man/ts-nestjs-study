export type RecursiveStructure<K extends string | number | symbol, T> = {
  [P in K]: RecursiveStructure<K, T> | T;
};

type _StrLenConstructor<Str, Cnt extends string[] = []> = Str extends `${string}${infer S}`
  ? _StrLenConstructor<S, ['', ...Cnt]>
  : Str extends `${string}`
  ? Cnt
  : Str;

type _TupleConstructor<T, N extends number, R extends unknown[]> = R['length'] extends N
  ? R
  : _TupleConstructor<T, N, [T, ...R]>;
/**
 * @summary object의 키 값이 될 수 있는 타입들의 union
 */
export type Keyable = string | number | symbol;

export type Include<T, U> = T extends U ? T : never;

/**
 * @summary T에서 K에 해당하는 키들의 optional modifier를 제거한 타임
 */
export type RequiredPick<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

/**
 * @summary T에서 K를 제외한 키들의 optional modifier를 제거한 타입
 *
 * @see https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
 */
export type RequiredOmit<T, K extends keyof T> = Required<Omit<T, K>> & Pick<T, K>;

/**
 * @summary T에서 K에 해당하는 키들의 optional modifier를 제거한 타임
 */
export type PartialPick<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

// type PartialPick2<T, K extends Keyable> = {
//   [P in keyof T as Include<P, K>]+?: T[P];
// } & {
//   [P in keyof T as Exclude<P, K>]: T[P];
// };

/**
 * @summary T에서 K를 제외한 키들의 optional modifier를 제거한 타입
 *
 * @see https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
 */
export type PartialOmit<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;

/**
 * @summary Add null and undefined to T
 */
export type Nullable<T> = T | null | undefined;

/**
 *
 * @param obj object to checked
 * @param propertyKeys property keys to check
 * @param errorConstructionData error construction data for MockApiError
 * - default value is
 * ```typescript
 * {
 *   message: `${propertyKeys.join(', ')} is required` | `${key} is required`,
 *   status: ErrorStatus.BAD_REQUEST
 * }
 * ```
 * @param propertyValidator if validator return true, property exist
 * @param objectValidator if validator return true, object exist
 * @returns {obj as RemoveNullAll<T>}
 */
export type RemoveNullAll<T> = { [K in keyof T]-?: NonNullable<T[K]> };

export function isNotNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export type Concrete<T> = T extends object ? { [P in keyof T]-?: Concrete<T[P]> } : NonNullable<T>;

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

export type DeepMerge<T1, T2> = T1 extends object
  ? T2 extends object
    ? MergeToOne<
        { [K in keyof T2 & keyof T1 & RequiredKeys<T1 | T2>]: DeepMerge<T1[K], T2[K]> } & {
          [K in keyof T2 & keyof T1 & OptionalKeys<T1 | T2>]?: DeepMerge<T1[K], T2[K]>;
        } & { [K in Exclude<RequiredKeys<T1>, keyof T2>]: T1[K] } & {
          [K in Exclude<OptionalKeys<T1>, keyof T2>]?: T1[K];
        } & { [K in Exclude<RequiredKeys<T2>, keyof T1>]: T2[K] } & {
          [K in Exclude<OptionalKeys<T2>, keyof T1>]?: T2[K];
        }
      >
    : T1 extends object
    ? T2
    : T1 | T2
  : T2 extends object
  ? T1
  : T1 | T2;

// so you don't get "T & {} & {}"
// also assumes that "undefined" is only ever a value included by optional params... I couldn't find a way around this
type MergeToOne<T> = T extends object
  ? {
      [K in keyof T]: K extends RequiredKeys<T> ? Exclude<T[K], undefined> : T[K];
    }
  : never;

type RequiredKeys<T> = {
  [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? never : K;
}[keyof T];
type OptionalKeys<T> = {
  [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * @summary Make T's property non-literal & more general
 *
 * @description
 * - Currently support string & number literal to it's origin type, true & false to boolean
 *
 * @example
 * type A = { a: 'asfg' };
 * type WeakenA = Weaken<A>; // { a: string }
 *
 * type B = { b: true };
 * type WeakenB = Weaken<B>; // { b: boolean }
 */
export type Weaken<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends object
  ? { [P in keyof T]: Weaken<T[P]> }
  : T;

export type ArrayToUnion<T extends readonly any[]> = T[number];

export type SplitBy<
  T extends string,
  Separator extends string,
> = T extends `${infer A}${Separator}${infer B}` ? A | SplitBy<B, Separator> : T;

export type PartialRecursive<T> = {
  [P in keyof T]?: T[P] extends object ? PartialRecursive<T[P]> : T[P];
};

export type IsNever<T> = [T] extends [never] ? true : false;

export type IsSupersetOf<Superset, Subset> = [Subset] extends [Superset] ? true : false;

export type IsEqual<T1, T2> = IsSupersetOf<T1, T2> & IsSupersetOf<T2, T1> extends false
  ? false
  : true;

export type ArrayLen<Arr> = Arr extends Array<any> ? Arr['length'] : never;
export type StrLen<Str> = Str extends string ? ArrayLen<_StrLenConstructor<Str>> : never;
export type NumLen<Num> = Num extends number ? StrLen<`${Num}`> : never;

export type LengthOf<T extends Array<any> | string | number> = T extends Array<any>
  ? ArrayLen<T>
  : T extends string
  ? StrLen<T>
  : T extends number
  ? NumLen<T>
  : never;

export type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleConstructor<T, N, []>
  : never;

/**
 * @summary One of properties in T
 *
 * @deprecated
 * TODO: 공통 프로퍼티 없이 타입 추론이 가능한지 확인해보기
 * 이대로 사용하면 안됨, 모든 타입에 공통 프로퍼티가 있어야 타입 추론이 가능함
 */
export type OneOf<T> = keyof T extends infer K
  ? K extends keyof T
    ? { [key in K]: T[key] }
    : never
  : never;

export type EnumToValueLiterals<E extends string | number | bigint | boolean> = `${E}`;

export type KeyOfEnum<T extends object> = { [K in keyof T]: K };
export type EnumToRecord<T> = { [K in keyof T]: Record<keyof T[K], string> };

export type PromiseResolver<T = void> = (value: T | PromiseLike<T>) => void;

export interface IBaseEvent<T> {
  payload: T;
}

export type ValueOf<T> = T[keyof T];

/**
 * @summary Methods of Class
 */
export type MethodsOf<Class> = keyof Class extends infer K
  ? K extends keyof Class
    ? Class[K] extends (...args: any[]) => any
      ? K
      : never
    : never
  : never;

/**
 * @summary Member variables of Class
 */
export type VariablesOf<Class> = keyof Class extends infer K
  ? K extends keyof Class
    ? Class[K] extends (...args: any[]) => any
      ? never
      : K
    : never
  : never;

export type AbstractConstructor<T = any, TA = any> = abstract new (...args: TA[]) => T;
export type Constructor<T = any, TA = any> = new (...args: TA[]) => T;
export type PrototypeOf<T> = T extends abstract new (...args: any[]) => infer R ? R : never;

export type IsEmpty<T> = T extends Record<any, never>
  ? true
  : T extends Array<any>
  ? T['length'] extends 0
    ? true
    : false
  : false;

export type IsRequiredProperty<T extends object, Key extends keyof T> = IsEqual<
  Pick<T, Key>,
  Required<Pick<T, Key>>
>;

export type IsAllRequired<T extends object> = IsEqual<T, Required<T>>;
export type IsAllPartial<T extends object> = IsEqual<T, Partial<T>>;

export type PartialArg<Arg extends object, Ret> = IsAllPartial<Arg> extends true
  ? (config?: Arg) => Ret
  : (config: Arg) => Ret;

export type ReplaceString<
  Str extends string,
  From extends string,
  To extends string,
> = Str extends `${infer Prev}${From}${infer Next}`
  ? `${ReplaceString<Prev, From, To>}${To}${ReplaceString<Next, From, To>}`
  : Str;

type AlphabetUpperMap = {
  a: 'A';
  b: 'B';
  c: 'C';
  d: 'D';
  e: 'E';
  f: 'F';
  g: 'G';
  h: 'H';
  i: 'I';
  j: 'J';
  k: 'K';
  l: 'L';
  m: 'M';
  n: 'N';
  o: 'O';
  p: 'P';
  q: 'Q';
  r: 'R';
  s: 'S';
  t: 'T';
  u: 'U';
  v: 'V';
  w: 'W';
  x: 'X';
  y: 'Y';
  z: 'Z';
};

export type ToUpperCase<Lower extends keyof AlphabetUpperMap> = AlphabetUpperMap[Lower];
export type ToLowerCase<Upper extends ValueOf<AlphabetUpperMap>> =
  keyof AlphabetUpperMap extends infer Lower
    ? Lower extends keyof AlphabetUpperMap
      ? IsEqual<Upper, AlphabetUpperMap[Lower]> extends true
        ? Lower
        : never
      : never
    : never;

export type ToFirstUpper<S extends string> = S extends `${infer First}${infer Rest}`
  ? First extends keyof AlphabetUpperMap
    ? `${ToUpperCase<First>}${Rest}`
    : S
  : S;

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

export type IntersectArrayItems<T extends any[]> = UnionToIntersection<ArrayToUnion<T>>;

export type UnionArrayItems<T extends any[]> = ArrayToUnion<T>;

type NonConstructorKeys<T> = {
  [P in keyof T]: T[P] extends new () => any ? never : P;
}[keyof T];
export type NonConstructor<T> = Pick<T, NonConstructorKeys<T>>;

export type InstanceOf<T> = T extends abstract new (...args: any[]) => infer R ? R : never;

export type ClassLike<T = any, TA extends any[] = any[]> = abstract new (...args: TA) => T | object;

export type Mixin<
  BaseClass extends ClassLike,
  InstanceMixin extends Record<Keyable, any>,
  StaticMixin extends Record<Keyable, any> = Record<string, never>,
> = NonConstructor<BaseClass> & StaticMixin & { new (): InstanceOf<BaseClass> & InstanceMixin };
