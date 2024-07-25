'use client';

import { ticker } from "@/polygon_api/ticker";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SearchContainer } from "./SearchContainer";
import { useQuery } from "@tanstack/react-query";
import { ITickersResults } from "@polygon.io/client-js";

export const SearchBar = ({
    className,
}: {
    className: string | undefined,
}) => {
    const [ hover, setHover ] = useState(false);
    const [ focus, setFocus ] = useState(false);
    const [ visible, setVisible ] = useState(false);
    const [ value, setValue ] = useState("");

    const [ data, setData ] = useState<ITickersResults[]>([]);

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };
  
    useEffect(() => {
      const timeoutId = setTimeout(query, 1000);
      return () => clearTimeout(timeoutId);
    }, [value]);

    const query = () => {
        ticker(value).then((data) => {
            setData(data);
        });
    }

    const onBlur = () => {
        setFocus(false);
        setVisible(false);
    }

    const onFocus = () => {
        setFocus(true);
        setVisible(true);
    }

    const onHover = () => {
        setHover(true);
    }

    const onLeave = () => {
        setHover(false);
    }

    return (
        <div className={`relative flex flex-col items-center max-w-96 flex-1 min-w-48 h-max ${className}`}>
            <div className="flex items-center w-full px-2">
                <input 
                    type="text" 
                    className="w-full mb-1 text-2xl focus:outline-none font-medium bg-transparent" 
                    placeholder="Search"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onMouseEnter={onHover}
                    onMouseLeave={onLeave}    
                    onChange={handleOnChange}
                    value={value}
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
            <SearchContainer className={`absolute top-10 ${visible && data.length > 0 ? 'block' : 'hidden'}`} results={data}/>
        </div>
    )
}
