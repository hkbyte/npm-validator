import { TypeBase } from '../base';
declare type ParsedType = Array<unknown> | null | undefined;
declare type PostValidations = {
    returnDefaultOnEmpty?: boolean;
    returnDefaultOnNull?: boolean;
    default?: ParsedType;
};
export declare class TypeArray extends TypeBase<NonNullable<ParsedType>> {
    private preValidations;
    private validations;
    private postValidations;
    private schema;
    constructor(schema: TypeBase<unknown>);
    nullable(returnDefaultOnNull?: boolean): this;
    nonEmpty(returnDefaultOnEmpty?: boolean): this;
    optional(): this;
    default(defaultValue: PostValidations['default']): this;
    parse(payload: unknown[]): Promise<ParsedType>;
}
export {};
