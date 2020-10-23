import { TypeBase } from '../base';
export declare type TypeObjectSchema = {
    [name: string]: TypeBase<unknown>;
};
declare type ParsedType = object | null | undefined;
declare type PostValidations = {
    returnDefaultOnEmpty?: boolean;
    returnDefaultOnNull?: boolean;
    default?: ParsedType;
};
export declare class TypeObject extends TypeBase<NonNullable<ParsedType>> {
    private preValidations;
    private postValidations;
    private schema;
    constructor(schema: TypeObjectSchema);
    nullable(returnDefaultOnNull?: boolean): this;
    nonEmpty(returnDefaultOnEmpty?: boolean): this;
    optional(): this;
    default(defaultValue: PostValidations['default']): this;
    parse(payload: unknown): Promise<ParsedType>;
}
export {};
