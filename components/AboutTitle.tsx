export interface AboutTitleProps {
    className?: string | undefined,
    children?: React.ReactNode,
}

export const AboutTitle = ({
    className,
}: AboutTitleProps) => {
    return (
        <h2 className={`text-4xl font-bold mb-4 ${ className }`}>
            
        </h2>
    )
}