import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { FormActionFunction, FormErrors, FormStateType, FormValues } from "./kform.types";
import { useFormState } from "react-dom";
import { Schema } from "./kschema/Schema";

export class KForm {
    errors: FormErrors;
    setErrors: Dispatch<SetStateAction<FormErrors>>;
    values: FormValues;
    setValues: Dispatch<SetStateAction<FormValues>>;
    schema: Schema;

    constructor(formSchema: Schema) {
        [ this.errors, this.setErrors ] = useState(formSchema.getDefaultErrors());
        [ this.values, this.setValues ] = useState(formSchema.getDefaultValues());
        this.schema = formSchema;
    }

    public clearErrors() {
        this.setErrors(this.schema.getDefaultErrors());
    }

    public handleSubmit(e: FormEvent<HTMLFormElement>) {
        const errorKeys = this.getErrorKeys();

        this.updateErrors(errorKeys);

        if(this.hasErrors()) {
            e.preventDefault();
        }
    }

    public getErrorKeys(): FormErrors {
        let errorKeys: FormErrors = {};
        Object.keys(this.values).map((key) => {
            if (this.schema.validateKey(key, this.values[key])) {
                errorKeys[key] = true;
            }
        });

        return errorKeys;
    }

    public hasErrors() {
        return !Object.values(this.errors).every((v) => v === false);
    }

    public updateErrors(obj: FormErrors) {
        this.setErrors({
            ...this.errors,
            ...obj,
        });
    }

    public updateValues(obj: FormValues) {
        this.setValues({
            ...this.values,
            ...obj,
        });
    }
}

export const handleKFormSubmit = (form: KForm, e: FormEvent<HTMLFormElement>, func?: () => void) => {
    form.handleSubmit(e);
    if (func) {
        func();
    }
}

export const useKForm = <StateT>(formSchema: Schema, action: FormActionFunction<StateT>, initialState: Awaited<StateT>) => {
    const form = new KForm(formSchema);
    const [ state, formAction ] = useFormState(action, initialState);

    return {
        form: form,
        state: state,
        formAction: formAction,
    }
}
