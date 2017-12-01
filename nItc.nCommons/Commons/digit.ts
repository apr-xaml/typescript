

export type Digit = (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9);


export class OneDigit
{
    d1: Digit
}

export class TwoDigits
{
    public constructor(public readonly d1: Digit, public readonly d2: Digit)
    {

    }
}


export class ThreeDigits
{
    public constructor(public readonly d1: Digit, public readonly d2: Digit, public readonly d3: Digit)
    {

    }
}



export class FourDigits
{
    public constructor(public readonly d1: Digit, public readonly d2: Digit, public readonly d3: Digit, public readonly d4: Digit)
    {

    }
}
