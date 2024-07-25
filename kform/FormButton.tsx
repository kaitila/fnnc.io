import { useFormStatus } from "react-dom"

export interface FormButtonProps {
    className?: string | undefined,
    children?: React.ReactNode | undefined,
}

export const FormButton = ({
    className, children
}: FormButtonProps) => {
    const { pending } = useFormStatus();

    return (
        <button className={className} type="submit" disabled={pending}>
            { children }
        </button>
    );
}