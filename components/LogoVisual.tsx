export const LogoVisual = ({
    className
}: {
    className?: string | undefined,
}) => {
    return (
        <div className={`w-80 h-80 ${className}`}>
            <div className="bg-text w-1/2 aspect-square ml-10 rounded-2xl mb-4"></div>
            <div className="flex items-start gap-4">
                <div className="w-2/5 aspect-square bg-light rounded-2xl"></div>
                <div className="w-1/2 aspect-square bg-primary rounded-2xl"></div>
            </div>
        </div>
    );
}

export const LogoVisualSmall = ({
    className
}: {
    className?: string | undefined,
}) => {
    return (
        <div className={`w-40 h-40 ${className}`}>
            <div className="bg-text w-1/2 aspect-square ml-10 rounded-lg mb-2"></div>   
            <div className="flex items-start gap-2">
                <div className="w-2/5 aspect-square bg-light rounded-lg"></div>
                <div className="w-1/2 aspect-square bg-primary rounded-lg"></div>
            </div>
        </div>
    );
}