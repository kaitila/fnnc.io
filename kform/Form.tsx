'use client';

import { handleKFormSubmit, KForm } from "./KForm";
import { createContext } from "react";
import { KFormProvider } from "./context/KFormProvider";

export interface KFormProps {
    action: (payload: FormData) => void,
    form: KForm,
    onSubmit?: () => void,
    children?: React.ReactNode,
}

export const FormContext = createContext<KForm | null>(null);

export const Form = ({
    action,
    form,
    onSubmit,
    children
}: KFormProps) => {
    return (
        <form action={action} onSubmit={(e) => handleKFormSubmit(form, e, onSubmit)} noValidate>
            <KFormProvider form={form}>
                { children }
            </KFormProvider>
        </form>
    );
}
