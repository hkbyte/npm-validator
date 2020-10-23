import { TypeString } from './types/string'
import { TypeObject, TypeObjectSchema } from './types/object'
import { TypeNumber } from './types/number'
import { TypeBoolean } from './types/boolean'
import { TypeArray } from './types/array'
import { TypeBase } from './base'
import { TypeAny } from './types/any'

export class T {
    static any() {
        return new TypeAny()
    }
    static string() {
        return new TypeString()
    }
    static number() {
        return new TypeNumber()
    }
    static boolean() {
        return new TypeBoolean()
    }
    static array(elementSchema: TypeBase<unknown>) {
        return new TypeArray(elementSchema)
    }
    static object(schema: TypeObjectSchema) {
        return new TypeObject(schema)
    }
}

export {
    TypeAny,
    TypeArray,
    TypeBase,
    TypeBoolean,
    TypeNumber,
    TypeObject,
    TypeObjectSchema,
}

export { MobilePhoneLocaleType, PostalCodeLocaleType } from './types/string'
export { ParsingError, PathErrorObject } from './errors'
