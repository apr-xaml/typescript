export interface MemberOfFamily<TKindEnum>
{
    readonly kind: TKindEnum;
}


export interface SpecificMemberOfFamily<T extends TKindEnum, TKindEnum> extends MemberOfFamily<TKindEnum>
{
    readonly kind: T;
}