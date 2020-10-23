import { TypeBase } from '../base';
declare type ParsedType = boolean | null | undefined;
declare type PostValidations = {
    returnDefaultOnNull?: boolean;
    default?: ParsedType;
};
export declare class TypeBoolean extends TypeBase<NonNullable<ParsedType>> {
    private preValidations;
    private validations;
    private postValidations;
    constructor();
    nullable(returnDefaultOnNull?: boolean): this;
    optional(): this;
    default(defaultValue: PostValidations['default']): this;
    parse(payload: unknown): Promise<ParsedType>;
}
export {};
