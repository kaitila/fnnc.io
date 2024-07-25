import { FieldProvider } from "./context/FieldProvider";

interface FormFieldProps {
    children: React.ReactNode,
    name: string,
    className: string | undefined,
}

export const FormField = ({
    children,
    name,
    className,
} : FormFieldProps) => {
    return (
        <div className={className}>
            <FieldProvider name={name}>
                { children }
            </FieldProvider>    
        </div> 
    );
}