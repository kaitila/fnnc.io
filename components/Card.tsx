interface CardProps {
    className?: string | undefined,
    children?: React.ReactNode,
}

export const Card = ({
    className,
    children,
}: CardProps) => {
    return (
        <div className={`
            border-2 border-primary p-6
            ${className}
        `}>
            { children }
        </div>
    );
}