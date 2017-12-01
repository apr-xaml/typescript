
export interface IFactory<T extends object>
{
    createInstance(): T;
}



