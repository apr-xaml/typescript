export const TYPEOF_NUMBER = 'number';
export const TYPEOF_STRING = 'string';
export const TYPEOF_BOOL = 'boolean';
export const TYPEOF_SYMBOL = 'symbol'; 

export type NonPrimitive = object;
export type Primitive = (number | string | boolean | symbol);

export type Mutable<T> =
    {
        [P in keyof T]: T[P];
    }


export type TypeDescription<T> = {[prop in keyof T]: undefined };



export function isPrimitive(obj: any): obj is Primitive
{
    const objType = typeof obj;

    switch (objType)
    {
        case TYPEOF_BOOL:
        case TYPEOF_NUMBER:
        case TYPEOF_STRING:
        case TYPEOF_SYMBOL:
            return true;
        default:
            return false;
    }
}