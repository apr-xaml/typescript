import { TypeDescription } from "./Commons.TypeAliases";


export function getAllProperties<T>(typeDesc: (T | TypeDescription<T>)): ReadonlyArray<keyof T>
{
    const props: Array<keyof T> = [];

    //TODO
    for (var iPropName in typeDesc as any)
    {
        props.push(iPropName as keyof T);
    }

    return props;
}


export function instanceOf<T>(x: any, propety: keyof T): x is T
{
    const prop = x[propety];
    return (prop != undefined);
}