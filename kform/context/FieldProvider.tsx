import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

type FieldState = false | 'hover' | 'focus';

export interface FormFieldType {
    name: string;
    hover: boolean;
    setHover: Dispatch<SetStateAction<boolean>>;
    focus: boolean;
    setFocus: Dispatch<SetStateAction<boolean>>;
}

const FieldContext = createContext<FormFieldType | undefined>(undefined);

export const FieldProvider = ({ 
    name, children
}: {
    name: string,
    children: React.ReactNode
}) => {

    const [ hover, setHover ] = useState(false);
    const [ focus, setFocus ] = useState(false);

    return (
        <FieldContext.Provider value={{ name, hover, setHover, focus, setFocus }}>
            {children}
        </FieldContext.Provider>
    )
}

export const useFormField = () => {
    const field = useContext(FieldContext);
    if(!field) {
        throw new Error('useFormField cant be used outside FieldContext.');
    }

    return field;
}