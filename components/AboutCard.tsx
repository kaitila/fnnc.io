export interface AboutCardProps {
    className?: string | undefined,
    appear?: 'left' | 'right' | 'top' | 'bottom' | undefined,
    align?: 'start' | 'end' | 'center' | undefined,
    children?: React.ReactNode,
}

export const AboutCard = ({
    className,
    appear,
    align = 'start',
    children,
}: AboutCardProps) => {
    return (
        <div className={`w-full my-4 flex ${align && `justify-${align}`} ${ className }`}>
            <div className={`max-w-112 ${appear && `appear-${appear}`}`}>
                { children }
            </div>
        </div>
    );
}