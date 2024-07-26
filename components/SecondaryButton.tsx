interface SecondaryButton {
    children: React.ReactNode,
    action?: () => void,
    className?: string,
    size?: 'sm' | 'base' | 'lg',
    disabled?: boolean,
}

export const SecondaryButton = ({
    children, action, className, size = 'base', disabled = false
}: SecondaryButton) => {
    return (
        <button 
            onClick={action} 
            disabled={disabled}
            className={`
                border-2 border-primary px-2 py-1 rounded-md text-${size} font-bold text-primary transition-all
                ${className}
                hover:bg-bgVariant active:text-active active:border-active 
                `}
            type="button"
            >
            {children}
        </button>
    );
}