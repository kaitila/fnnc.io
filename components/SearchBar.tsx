'use client';

import { getSearchQuery } from "@/apis/methods/getSearchQuery";
import { SearchQuery } from "@/apis/methods/types";
import { SearchContainer } from "@/components/SearchContainer";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa"

export interface SearchBarProps {
    className?: string | undefined,
    sqHeight: number,
    hoverStyles?: string,
    focusStyles?: string,
}

export const SearchBar = ({
    className,
    sqHeight,
    hoverStyles,
    focusStyles,
}: SearchBarProps) => {

    const [ focus, setFocus ] = useState(false);
    const [ hover, setHover ] = useState(false);
    const [ visible, setVisible ] = useState(false);
    const [ value, setValue ] = useState("");

    const [ data, setData ] = useState<SearchQuery>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };
  
    useEffect(() => {
      const timeoutId = setTimeout(query, 1000);
      return () => clearTimeout(timeoutId);
    }, [value]);

    const query = () => {
        getSearchQuery(value).then((data) => {
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

    const onClick = () => {
        router.push(`/dashboard/search?query=${value}`);
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClick();
            inputRef.current?.blur();
            if (inputRef.current?.value) {
                inputRef.current.value = '';
            }
            setValue('');
        }
    }
    /* w-144 */
    return (
        <div 
            className={` 
                relative w-full border shadow-sm border-lighter rounded-2xl py-3 px-6 flex gap-4 items-center h-max
                after:transition-all after:duration-300 after:ease-out
                after:content-[''] after:w-1/3 after:bg-primary after:h-1 after:-bottom-0.5 after:rounded-sm after:absolute after:left-1/2 after:-translate-x-1/2
                ${hover || focus ? 'after:w-2/3' : ''}
                ${ className }
        `}>
            <input 
                ref={inputRef}
                type="text"
                className="
                    w-full text-lg bg-transparent 
                    focus:outline-none
                "
                placeholder="Search"
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleOnChange}
                onKeyDown={onKeyDown}
            />
            <button onClick={onClick}>
                <FaSearch className="text-xl text-light transition-all cursor-pointer hover:text-primary"/>
            </button>
            <SearchContainer className={`absolute top-16 shadow-sm border border-lighter w-full left-0 ${data.length && visible ? 'block' : 'hidden'}`} maxHeight={sqHeight} maxHeightMd="" results={data}/>
        </div>
    )
}