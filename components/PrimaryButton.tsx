import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface PrimaryButtonProps {
    children: React.ReactNode,
    action?: () => void,
    className?: string,
    size?: 'sm' | 'base' | 'lg',
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'],
}

export const PrimaryButton = ({
    children,
    action,
    className,
    size = 'base',
    type = 'button',
}: PrimaryButtonProps) => {

    let pending = false;
    if (type === 'submit') {
        ({ pending } = useFormStatus());
    }

    return (
        <button 
            disabled={pending}
            onClick={action} 
            type={type} 
            className={`
                border-2 border-primary px-2 py-1 rounded-md bg-primary text-${size} font-bold text-bg transition-all 
                hover:bg-hover active:bg-active
                ${className}
            `}
        >
            {children}
        </button>
    );
}