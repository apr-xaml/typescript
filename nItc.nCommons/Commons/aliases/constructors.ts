export type Arg0Constructor<T> = new () => T;
export type Arg1Constructor<TArg1, TRes> = new (x1: TArg1) => TRes;
export type Arg2Constructor<TArg1, TArg2, TRes> = new (x1: TArg1, x2: TArg2) => TRes;
export type Arg3Constructor<TArg1, TArg2, TArg3, TRes> = new (x1: TArg1, x2: TArg2, x3: TArg3) => TRes;