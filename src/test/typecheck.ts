export type Pass = true;
export type Fail = false;

export type IsEqual<T1, T2> = T1 extends T2
  ? (T2 extends T1 ? Pass : Fail)
  : Fail;

export declare function equal<
  Actual,
  Expect,
  Result extends Pass | Fail = Pass,
>(): IsEqual<IsEqual<Actual, Expect>, Result>;

export declare function extend<
  Actual,
  Expect,
  Result extends Pass | Fail = Pass,
>(): IsEqual<Actual extends Expect ? Pass : Fail, Result>;

export declare function checks(...cases: Pass[]): void;
