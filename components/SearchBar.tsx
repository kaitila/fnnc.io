'use client';

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const SearchBar = ({
    className,
}: {
    className: string | undefined,
}) => {
    const [ hover, setHover ] = useState(false);
    const [ focus, setFocus ] = useState(false);

    const onBlur = () => {
        setFocus(false);
    }

    const onFocus = () => {
        setFocus(true);
    }

    const onHover = () => {
        setHover(true);
    }

    const onLeave = () => {
        setHover(false);
    }

    return (
        <div className={`flex flex-col items-center max-w-96 flex-1 min-w-48 ${className}`}>
            <div className="flex items-center w-full px-2">
                <input 
                    type="text" 
                    className="w-full mb-1 text-2xl focus:outline-none font-medium bg-transparent" 
                    placeholder="Search"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onMouseEnter={onHover}
                    onMouseLeave={onLeave}    
                />
                <FaSearch className="text-xl transition-all cursor-pointer hover:text-primary"/>
            </div>
            <div 
                className={`
                    w-full relative h-0.5 rounded-sm bg-light after:transition-all after:duration-300 after:ease-out
                    after:content-[''] after:w-1/3 after:bg-primary after:h-1 after:-bottom-0.25 after:rounded-sm after:absolute 
                    ${hover || focus ? 'after:w-2/3' : ''}
                `}
            ></div>
        </div>
    )
}