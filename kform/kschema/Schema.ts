import { FormErrors, FormValues } from '../kform.types';
import { InputType, ISchema, ISchemaCheckbox, ISchemaEmail, ISchemaKey, ISchemaPassword, ISchemaText } from './types';
import { SchemaConfig, SchemaObj, SchemaProps } from "./types";

export class Schema {
    schema: ISchema;
    config: SchemaConfig;

    constructor(schema: SchemaObj, config: SchemaConfig) {
        this.schema = this.initSchema(schema);
        this.config = {
            requiredError: 'Field required',
            ...config,
        };
    }

    public get(key: string): ISchemaKey {
        if (this.schema.hasOwnProperty(key)) {
            return this.schema[key];
        }

        throw new Error('Invalid key (schema.get())');
    }

    public validateKey(key: string, value: any, match?: string) {
        if (!this.schema.hasOwnProperty(key)) {
            throw new Error(`Key: ${key} does not exist on schema.`);
        }

        const keySchema = this.get(key);
        if (keySchema.required && !value) {
            return true;
        }

        if (!value) {
            return false;
        }

        value = value as string;

        if (keySchema.type == 'checkbox') {
            return false;
        }

        type ISchemaString = ISchemaEmail | ISchemaText | ISchemaPassword;
        
        if (keySchema.type == 'email' && !value.match((this.get(key) as ISchemaEmail).regex)) {
            return true;
        }

        if (match && value !== match) {
            return true;
        }
        
        if ((keySchema as ISchemaString).minLength > (value as string).length || (keySchema as ISchemaString).maxLength < value.length) {
            return true;
        }

        return false;
    }

    private validateTypes(formData: FormData) {

    }

    public serverValidation(formData: FormData) {
        const errors: string[] = [];
        const data: {
            [key: string]: string,
        } = {};
        Object.keys(this.schema).forEach((key) => {
            const keyData = formData.get(key);

            let match: string | undefined = undefined;
            if (this.get(key).match !== '') {
                match = formData.get(this.get(key).match) as string;
            }

            const error = this.validateKey(key, keyData, match);
            if (error) {
                errors.push(key);
            } else {
                data[key] = keyData as string;
            }
        });

        return { data, errors };
    }

    private initSchema(schema: SchemaObj) {
        let newSchema: ISchema = {};
        Object.keys(schema).forEach((key) => {
            if (schema[key].hasOwnProperty('type')) {
                newSchema[key] = {
                    ...this.getDefaultProps(schema[key].type!),
                    ...schema[key],
                };
            } else {
                newSchema[key] = {
                    ...this.getDefaultProps('text'),
                };
            }
        });

        return newSchema;
    }

    private getDefaultProps(type: InputType): ISchemaKey {
        switch (type) {
            case 'text':
                return {
                    required: true,
                    message: 'Error',
                    type: 'text',
                    minLength: 0,
                    maxLength: 100,
                    defaultValue: '',
                    regex: undefined,
                    tsType: 'string',
                    match: '',
                } as ISchemaText;
            case 'email':
                return {
                    required: true,
                    message: 'Error',
                    type: 'email',
                    minLength: 4,
                    maxLength: 100,
                    defaultValue: '',
                    regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    tsType: 'string',
                    match: '',
                } as ISchemaEmail;
            case 'checkbox':
                return {
                    required: true,
                    message: 'Error',
                    type: 'checkbox',
                    defaultValue: 'off',
                    tsType: 'boolean',
                    match: '',
                } as ISchemaCheckbox;
            case 'password':
                return {
                    required: true,
                    message: 'Error',
                    type: 'password',
                    defaultValue: '',
                    minLength: 6,
                    maxLength: 32,
                    regex: undefined,
                    tsType: 'string',
                    match: '',
                } as ISchemaPassword;
        }
    }

    public getDefaultErrors = () => {
        const obj: FormErrors = {};
    
        Object.keys(this.schema).forEach((key) => {
            obj[key] = false
        });
    
        return obj;
    }

    public getDefaultValues = () => {
        const obj: FormValues = {};
    
        Object.keys(this.schema).forEach((key) => {
            if (!this.get(key).defaultValue) {
                obj[key] = '';
            } else {
                obj[key] = this.get(key).defaultValue;
            }
        });
    
        return obj;
    }
}

