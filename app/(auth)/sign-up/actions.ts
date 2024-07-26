'use server';
import { FormStateType } from "@/kform/kform.types";
import { signUpSchema } from "@/schemas/auth";
import { IFormState } from "@/types";
import { createClient, createServiceClient } from "@/utils/supabase/server";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signUp = async (
    prevState: IFormState, formData: FormData
): Promise<IFormState> => {
    const { data, errors } = signUpSchema.serverValidation(formData);

    if (errors.length > 0) {
        return {
            message: 'Invalid sign up credentials',
            code: 103,
        }
    }

    const supabase = createClient();

    const signUpData: SignUpWithPasswordCredentials = {
        email: data.email,
        password: data.password,
        options: {
            data: {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
            }
        }
    }

    const { error } = await supabase.auth.signUp(signUpData);

    if (error && error.code == 'user_already_exists') {
        return {
            message: 'This user already exists',
            code: 100,
        }
    } else if (error) {
        console.log(error);
        return {
            message: 'Something went wrong',
            code: 101,
        }
    }

    revalidatePath('/', 'layout');
    redirect('/user');
}

export const validateEmail = async (email: string) => {
    const supabase = createServiceClient();
    const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('email', email);
    
    if (count) {
        return {
            code: 100,
        }
    }

    return {
        
    }
}
