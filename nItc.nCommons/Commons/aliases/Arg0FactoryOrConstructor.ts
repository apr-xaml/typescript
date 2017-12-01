import { Arg0Constructor } from "./constructors";
import { Arg0Factory } from "./factories";
import { _NEVER } from "../Commons.Assertions";


export type Arg0FactoryOrConstructor<T> = (Arg0Constructor<T> | Arg0Factory<T>);


export enum CallingModeEnum
{
    JustInvoke,
    InvokeWithNew
}

export function invokeArg0FactoryOrConstructor<T>(ctrOrFactory: Arg0FactoryOrConstructor<T>, callingProcedure: CallingModeEnum)
{
    switch (callingProcedure)
    {
        case CallingModeEnum.JustInvoke:
            {
                return (ctrOrFactory as Arg0Factory<T>)();
            }
        case CallingModeEnum.InvokeWithNew:
            {
                return new (ctrOrFactory as Arg0Constructor<T>)();
            }
        default:
            return _NEVER(callingProcedure);
    }


}