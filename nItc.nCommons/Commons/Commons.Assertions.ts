export function _FAIL(): never
{
    throw new Error();
}


export function _NEVER(neverValue: never): never
{
    throw new Error();
}

export function _ASSERT(condition: boolean): (void | never)
{
    if (!condition)
    {
        throw new Error();
    }
}



export function _ASSERT_DEFINED<T>(obj: (T | undefined)): T
{
    if (obj == undefined)
    {
        return _FAIL();
    }
    else
    {
        return obj;
    }
}

export function _ASSERT_SINGLE_ITEM<T>(array: ReadonlyArray<T>): [T]
{
    const [x, ...rest] = array;
    if (rest.length > 0)
    {
        return _FAIL();
    }
    else
    {
        return [x];
    }
}