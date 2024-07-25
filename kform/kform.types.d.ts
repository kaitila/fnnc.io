import { KSchema } from "./kschema";

export interface FormStateType {
    errors?: string[] | undefined,
    message?: string | undefined,
}

export type FormActionFunction<T> = ( prevState: T, formData: FormData ) => Promise<T>;

export interface FormErrors {
    [key: string]: boolean,
}

export interface FormValues {
    [key: string]: any,
}

