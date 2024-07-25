export interface SchemaObj extends Object {
    [key: string]: SchemaProps,
}

export interface SchemaProps extends Object {
    required?: boolean,
    message?: string,
    type?: InputType,
    minLength?: number,
    maxLength?: number,
    defaultValue?: string | boolean,
    regex?: RegExp,
    tsType?: string | boolean,
    match?: string,
}

export interface SchemaConfig extends Object {
    requiredError?: string,
}

export type InputType = 'text' | 'email' | 'password' | 'checkbox';

type ISchemaBase<T> = {
    [Key in keyof T as Exclude<Key, 'regex' | 'minLength' | 'maxLength'>]-?: T[Key];
}

export type ISchemaCheckbox = ISchemaBase<SchemaProps>;

export type ISchemaText = ISchemaBase<SchemaProps> & {
    type: 'text';
    minLength: number;
    maxLength: number;
    regex: RegExp | undefined;
}

export type ISchemaEmail = ISchemaBase<SchemaProps> & {
    type: 'email';
    minLength: number;
    maxLength: number;
    regex: RegExp;
}

export type ISchemaPassword = ISchemaBase<SchemaProps> & {
    type: 'password';
    minLength: number;
    maxLength: number;
    regex: RegExp | undefined;
}

export type ISchemaKey = ISchemaCheckbox | ISchemaText | ISchemaEmail | ISchemaPassword;

export interface ISchema extends Object {
    [key: string]: ISchemaKey;
}


