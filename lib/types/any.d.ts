import { TypeBase } from '../base';
declare type ParsedType = any | null | undefined;
declare type PostValidations = {
    returnDefaultOnNull?: boolean;
    default?: ParsedType;
};
export declare class TypeAny extends TypeBase<NonNullable<ParsedType>> {
    private preValidations;
    private postValidations;
    constructor();
    nullable(returnDefaultOnNull?: boolean): this;
    optional(): this;
    default(defaultValue: PostValidations['default']): this;
    parse(payload: any): Promise<ParsedType>;
}
export {};
