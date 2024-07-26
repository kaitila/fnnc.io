'use client';

import { signUp, validateEmail } from "@/app/(auth)/sign-up/actions";
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
import { createClient } from "@/utils/supabase/client";
import { SecondaryButton } from "../SecondaryButton";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const SignUpForm = () => {
    const initialState: IFormState = {
        errors: [],
        message: undefined,
        code: undefined,
    }

    const supabase = createClient();

    const { form, state, formAction } = useKForm(signUpSchema, signUp, initialState);
    const [ error, setError ] = useState(false);

    const [ startingView, setStartingView ] = useState(true);
    const [ code, setCode ] = useState<undefined | 100>(undefined);
    const [ pending, setPending ] = useState(false);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.signOut();
    }, []);

    useEffect(() => {
        if (state.code) {
            setError(true);
            const timer = setTimeout(() => {
                setError(false);
            }, 4000);

            return () => clearTimeout(timer);
        }
        
    }, [state]);

    useEffect(() => {
        if (code) {
            setError(true);
            const timer = setTimeout(() => {
                setError(false);
                setCode(code => undefined);
            }, 4000);

            return () => clearTimeout(timer);
        }
        
    }, [code]);

    const handleNext = async () => {
        const errorKeys = form.getErrorKeys();
        if (Object.keys(errorKeys).length > 2) {
            form.updateErrors(errorKeys);
            return;
        }

        setPending(true);
        const response = await validateEmail(form.values.email);
        setPending(false);

        if (response.code && response.code == 100) {
            setCode(response.code);
            return;
        }

        form.clearErrors();
        setStartingView(false);
    }

    const handleBack = () => {
        setStartingView(true);
    }

    return (
        <div className="p-6 relative">
            <Form form={form} action={formAction}>
                <div className={`${!startingView && 'hidden'}`}>
                    <h2 className={`font-bold text-3xl mb-4 `}>Create a new account<span className="text-primary">.</span></h2>
                    <FormInputField name="email" placeholder="Email" type="email" className="mb-4"/>
                    <FormInputField name="password" placeholder="Password" type="password" className="mb-4"/>
                    <FormInputField name="confirmPassword" placeholder="Confirm password" type="password"/>
                    <ErrorMessage message={code ? formErrorCodes[code] : ''} className={`${error ? 'h-12 transition-to-error' : 'transition-from-error h-0 opacity-0'}`} />
                    
                    <SecondaryButton action={handleNext} disabled={pending} className="w-full mt-4 flex items-center justify-center">Next <IoIosArrowForward className="inline text-xl"/></SecondaryButton>
                </div>
                <div className={`${startingView && 'hidden'}`}>
                    <SecondaryButton 
                        className="flex items-center mb-4" 
                        size="sm"
                        action={handleBack}
                    >
                        <IoIosArrowBack className="inline text-lg"/> Back
                    </SecondaryButton>
                    <h2 className={`font-bold text-3xl mb-4 `}>Create a new account<span className="text-primary">.</span></h2>
                    <FormInputField name="firstName" placeholder="First name" type="text" className="mb-4"/>
                    <FormInputField name="lastName" placeholder="Last name" type="text" className="mb-4"/>
                    <ErrorMessage message={state.code && !startingView ? formErrorCodes[state.code] : ''} className={`${error ? 'h-12 transition-to-error' : 'transition-from-error h-0 opacity-0'}`} />
                    <PrimaryButton className="w-full mt-4 " type="submit">Sign up</PrimaryButton>
                </div>
            </Form>
            <div className={`${!startingView && 'hidden'}`}>
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
        </div>
    );
}