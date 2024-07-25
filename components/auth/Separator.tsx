export const Separator = ({
    className,
}: {
    className?: string,
}) => {
    return (
        <div className={`flex justify-center gap-2 items-center px-8 ${className}`}>
            <div className="bg-light h-0.25 w-full"></div>
            <span className="text-light w-max text-sm">or</span>
            <div className="bg-light h-0.25 w-full"></div>
        </div>
    );
}