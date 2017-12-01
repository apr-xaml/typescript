export class MoreThanOneElementError<T>
{
    constructor(public readonly entrySequence: Iterable<T>, public readonly firstMatching: T, public readonly secondMatching: T)
    {

    }
}

export class NotFoundError<T>
{
    constructor(public readonly entrySequence: Iterable<T>)
    {

    }
}