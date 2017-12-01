import { CallingModeEnum } from "./Arg0FactoryOrConstructor";
import { _NEVER } from "../Commons.Assertions";


export type SomeFactory = (...args: any[]) => any;

export type SomeConstructor = new (...args: any[]) => any;


export type SomeCtrOrFactory = (SomeFactory | SomeConstructor);


export type SomeFactoryWithKnownResult<TResult> = (...args: any[]) => TResult;
export type SomeConstructorWithKnownResult<TResult> = new (...args: any[]) => TResult;

export type SomeCtrOrFactoryWithKnownResult<TResult> = (SomeFactoryWithKnownResult<TResult> | SomeConstructorWithKnownResult<TResult>);


export function invokeSomeCtrOrFactory<TResult>(oxCtrOrFactory: SomeCtrOrFactoryWithKnownResult<TResult>, callingProcedure: CallingModeEnum, args: ReadonlyArray<any>): TResult
{

    switch (callingProcedure)
    {
        case CallingModeEnum.InvokeWithNew:
            {
                return new (oxCtrOrFactory as SomeConstructorWithKnownResult<TResult>)(...args);
            }
        case CallingModeEnum.JustInvoke:
            {
                const res = (oxCtrOrFactory as SomeFactoryWithKnownResult<TResult>)(...args);
                return res;
            }

        default:
            return _NEVER(callingProcedure);
    }

}