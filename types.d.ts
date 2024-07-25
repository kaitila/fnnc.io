import { FormStateType } from "@/kform/kform.types";

export interface IFormState extends FormStateType {
    code?: 100 | 101 | 102 | 103 | undefined,
}