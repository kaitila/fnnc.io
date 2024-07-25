import { useFormField } from "./context/FieldProvider";
import { useKFormContext } from "./context/KFormProvider";

export interface FormInputAfterProps {
    className?: string,
    errorStyle?: string,
    hoverStyle?: string,
    focusStyle?: string,
}

export const FormInputAfter = ({
    className = '',
    errorStyle = '',
    hoverStyle = '',
    focusStyle = '',
}: FormInputAfterProps) => {
    const form = useKFormContext();
    const { name, hover, focus } = useFormField();

    return (
        <div className={`${className} ${hover ? hoverStyle : ''} ${focus ? focusStyle : ''} ${form.errors[name] ? errorStyle : ''}`}></div>
    );
}