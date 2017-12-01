export type Arg0Factory<T> = () => T;
export type Arg1Factory<TArg1, T> = (x1: TArg1) => T;
export type Arg2Factory<TArg1, TArg2, T> = (x1: TArg1, x2: TArg2) => T;
export type Arg3Factory<TArg1, TArg2, TArg3, T> = (x1: TArg1, x2: TArg2, x3: TArg2) => T;