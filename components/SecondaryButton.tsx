interface SecondaryButton {
    children: React.ReactNode,
    action?: () => {},
    className?: string,
    size?: 'sm' | 'base' | 'lg',
}

export const SecondaryButton = ({
    children, action, className, size = 'base'
}: SecondaryButton) => {
    return (
        <button 
            onClick={action} 
            className={`
                border-2 border-primary px-2 py-1 rounded-md text-${size} font-bold text-primary transition-all
                ${className}
                hover:bg-bgVariant active:text-active active:border-active 
                `}
            >
            {children}
        </button>
    );
}