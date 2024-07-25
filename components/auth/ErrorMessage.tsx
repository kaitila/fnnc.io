'use client';

import { IoIosCloseCircleOutline } from "react-icons/io";

export const ErrorMessage = ({
    message,
    className,
}: {
    message: string,
    className?: string,
}) => {
    return (
            <div className={`relative ${className}`}>
                <div className={`
                    w-full px-2 py-1 absolute bottom-0 bg-stone-50 border-2 border-red-400 text-red-400 font-bold rounded-md flex justify-between items-center
                    
                    `}
                >
                    <p>{message}</p>
                </div>
            </div>
    );  
}