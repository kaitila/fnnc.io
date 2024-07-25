import { M_PLUS_Rounded_1c } from "next/font/google";

const mPlusRounded1c = M_PLUS_Rounded_1c({
    weight: ['800'],
    subsets: ['latin'],
});


export const Logo = ({ 
    className, darkMode 
}: { 
    className?: string,
    darkMode?: boolean,
}) => {
    
    return (
        <span className={`inline-block font-extrabold ${className} ${mPlusRounded1c.className}`}>
            fnnc<span className="text-primary">.</span>io
        </span>
    );
}