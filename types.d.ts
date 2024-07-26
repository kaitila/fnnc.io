import { FormStateType } from "@/kform/kform.types";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";

export interface IFormState extends FormStateType {
    code?: 100 | 101 | 102 | 103 | undefined,
}