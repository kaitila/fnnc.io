import '@/app/globals.css';

export interface ScrollingProps {
    className?: string | undefined,
}

export const Scrolling = ({
    className,
}: ScrollingProps) => {
    return (
        <div className={`w-full flex justify-center ${ className }`}>
            <div className="w-1 rounded-sm bg-secondary bg-opacity-50 h-full scrolling-animation"></div>
        </div>
    )
}