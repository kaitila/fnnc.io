'use client';

import { ChangeEvent, HTMLInputTypeAttribute } from "react";
import { useFormStatus } from "react-dom";
import { useKFormContext } from "./context/KFormProvider";
import { useFormField } from "./context/FieldProvider";

export interface InputProps {
    type?: HTMLInputTypeAttribute | undefined,
    placeholder?: string,
    className?: string | undefined,
    disabled?: boolean,
    errorStyle?: string | undefined,
}

export const FormInput = ({
    type = 'text', 
    placeholder, 
    className, 
    disabled = false,
    errorStyle = 'border-red-400',
}: InputProps) => {

    const { name, setHover, setFocus } = useFormField();
    const id = name;

    const form = useKFormContext();
    const { pending } = useFormStatus();

    let match: string | undefined = undefined;
    if (form.schema.get(name).match) {
        match = form.values[form.schema.get(name).match!];
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        form.updateValues({
            [name]: e.target.value,
        });

        const error = form.schema.validateKey(name, e.target.value, match);
        if (!error) {
            form.updateErrors({
                [name]: false,
            });
        }
    }

    const onBlur = () => {
        setFocus(false);
        const error = form.schema.validateKey(name, form.values[name], match);
        form.updateErrors({
            [name]: error,
        });
    }

    const onFocus = () => {
        setFocus(true);
    }

    const onHover = () => {
        setHover(true);
    }

    const onLeave = () => {
        setHover(false);
    }
    
    return (
        <input 
            type={type} 
            name={name} 
            id={id} 
            placeholder={placeholder} 
            className={`focus:outline-none border-2 border-black ${className} ${form.errors[name] ? errorStyle : ''} `} 
            disabled={pending || disabled} 
            value={form.values[name]} 
            onChange={(e) => handleChange(e)}
            onBlur={onBlur}
            onFocus={onFocus}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            autoComplete="off"
        />
    );
}

