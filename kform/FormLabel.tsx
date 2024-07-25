import { useFormField } from "./context/FieldProvider";

export interface FormLabelProps {
    children?: React.ReactNode | undefined,
    className?: string | undefined,
}

export const FormLabel = ({
    children, className
}: FormLabelProps) => {
    const { name } = useFormField();
    return (
        <label htmlFor={name} className={className}>
            { children }
        </label>
    );
}