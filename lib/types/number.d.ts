import { TypeBase } from '../base';
declare type ParsedType = number | null | undefined;
declare type PostValidations = {
    returnDefaultOnNull?: boolean;
    default?: ParsedType;
};
export declare class TypeNumber extends TypeBase<NonNullable<ParsedType>> {
    private preValidations;
    private validations;
    private postValidations;
    constructor();
    nullable(returnDefaultOnNull?: boolean): this;
    optional(): this;
    min(value: number): this;
    max(value: number): this;
    range(min: number, max: number): this;
    int(): this;
    positive(): this;
    nonPositive(): this;
    negative(): this;
    nonNegative(): this;
    default(defaultValue: PostValidations['default']): this;
    parse(payload: unknown): Promise<ParsedType>;
}
export {};
