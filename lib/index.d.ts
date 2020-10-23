import { TypeString } from './types/string';
import { TypeObject, TypeObjectSchema } from './types/object';
import { TypeNumber } from './types/number';
import { TypeBoolean } from './types/boolean';
import { TypeArray } from './types/array';
import { TypeBase } from './base';
import { TypeAny } from './types/any';
export declare class T {
    static any(): TypeAny;
    static string(): TypeString;
    static number(): TypeNumber;
    static boolean(): TypeBoolean;
    static array(elementSchema: TypeBase<unknown>): TypeArray;
    static object(schema: TypeObjectSchema): TypeObject;
}
