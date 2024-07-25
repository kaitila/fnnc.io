import { FormField } from "@/kform/FormField";
import { FormInput } from "@/kform/FormInput";
import { FormInputAfter } from "@/kform/FormInputAfter";
import { FormMessage } from "@/kform/FormMessage";

interface FormInputFieldProps {
    className?: string,
    name: string,
    type: string,
    placeholder: string,
}

export const FormInputField = ({
    className,
    name,
    type,
    placeholder
}: FormInputFieldProps) => {
    return (
        <FormField className={className} name={name}>
            <FormInput type={type} placeholder={placeholder} 
                className="relative w-full text-lg bg-transparent border-none px-0.5" 
                errorStyle=""
            />
            <FormInputAfter 
                className="w-full h-0.25 relative bg-light transition-all duration-500 ease-out
                    after:content-[''] after:h-0.5 after:absolute after:bg-primary after:rounded-xs after:w-0
                    after:transition-all after:duration-500 after:ease-out
                " 
                errorStyle="bg-red-400"
                hoverStyle="after:w-3/5"
                focusStyle="after:w-3/5"
            />
            <FormMessage className="text-red-400 block text-sm mt-0.5"/>
        </FormField>
    );
}