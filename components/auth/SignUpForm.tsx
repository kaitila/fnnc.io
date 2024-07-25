'use client';

import { signUp } from "@/app/(auth)/sign-up/actions";
import { Form } from "@/kform/Form";
import { useKForm } from "@/kform/KForm";
import { FormStateType } from "@/kform/kform.types";
import { signUpSchema } from "@/schemas/auth";
import { FormInputField } from "@/components/auth/FormInputField";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Separator } from "@/components/auth/Separator";
import { Social } from "./Social";
import Link from "next/link";
import { ErrorMessage } from "./ErrorMessage";
import { IFormState } from "@/types";
import { formErrorCodes } from "@/utils/formErrorCodes";
import { useEffect, useState } from "react";

import '@/app/globals.css';

export const SignUpForm = () => {
    const initialState: IFormState = {
        errors: [],
        message: undefined,
        code: undefined,
    }

    const { form, state, formAction } = useKForm(signUpSchema, signUp, initialState);
    const [ error, setError ] = useState(false);

    useEffect(() => {
        if (state.code) {
            setError(true);
            const timer = setTimeout(() => {
                setError(false)
            }, 4000);

            return () => clearTimeout(timer);
        }
        
    }, [state]);

    return (
        <div className="p-6">
            <Form form={form} action={formAction}>
                <h2 className="font-bold text-3xl mb-4">Create a new account<span className="text-primary">.</span></h2>
                <FormInputField name="email" placeholder="Email" type="email" className="mb-4"/>
                <FormInputField name="password" placeholder="Password" type="password" className="mb-4"/>
                <FormInputField name="confirmPassword" placeholder="Confirm password" type="password"/>
                <ErrorMessage message={state.code ? formErrorCodes[state.code] : ''} className={`${error ? 'h-12 transition-to-error' : 'transition-from-error h-0 opacity-0'}`} />
                
                <PrimaryButton type="submit" className="w-full mt-4">Sign up</PrimaryButton>
            </Form>
            <Separator className="my-3"/>
            <Social />
            <Separator className="my-3"/>
            <div className="flex justify-center">
                <Link href={'/sign-in'} className="
                    w-max text-sm text-light relative after:w-0 hover:after:w-full after:h-0.25 after:bg-light after:content-[''] after:absolute hover:after:left-0 after:left-1/2 after:bottom-0 after:transition-all
                    "
                >
                    Already have an account?
                </Link>
            </div>
        </div>
    );
}