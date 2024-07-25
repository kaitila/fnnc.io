import { useFormField } from "./context/FieldProvider";
import { useKFormContext } from "./context/KFormProvider";

export interface FormMessageProps {
    className?: string | undefined,
}

export const FormMessage = ({
    className
}: FormMessageProps) => {
    const form = useKFormContext();
    const { name } = useFormField();

    if (!form.schema.get(name).message) {
        return null;
    }

    return (
        <>
            {form.errors[name] ? (<p className={`text-red-400 ${className}`}>{form.schema.get(name).message}</p>) : null}
        </>
    );
}