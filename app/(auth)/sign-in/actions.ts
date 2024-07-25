'use server';
import { FormStateType } from "@/kform/kform.types";
import { signInWithPasswordSchema } from "@/schemas/auth";
import { IFormState } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const signInWithPassword = async (
    prevState: IFormState, formData: FormData
): Promise<IFormState> => {
    const { data, errors } = signInWithPasswordSchema.serverValidation(formData);

    if (errors.length > 0) {
        return {
            message: 'Invalid login credentials',
            code: 102,
        }
    }

    const supabase = createClient();

    const loginData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(loginData);

    if (error) {
        return {
            message: 'Invalid login credentials',
            code: 102,
        }
    }

    revalidatePath('/', 'layout');
    redirect('/user');
}