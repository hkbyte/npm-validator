export declare abstract class TypeBase<T> {
    readonly _type: T;
    abstract parse(value: unknown): Promise<T | null | undefined>;
}
