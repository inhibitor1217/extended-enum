export type Pass = true;
export type Fail = false;

export type IsEqual<T1, T2> =
  (<T>() => T extends T1 ? 1 : 2) extends
  (<T>() => T extends T2 ? 1 : 2) ? Pass : Fail;

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
