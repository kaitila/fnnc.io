'use client';

import { getSearchQuery } from "@/apis/methods/getSearchQuery";
import { StockViewMedium } from "./StockViewMedium";
import { useEffect, useState } from "react";
import { SearchQuery } from "@/apis/methods/types";

export interface ResultsContainerProps {
    className?: string | undefined,
    query?: string | null;
}

export const ResultsContainer = ({
    className,
    query,
}: ResultsContainerProps) => {
    if (!query) {
        return null;
    }

    const [ data, setData ] = useState<SearchQuery>([]);
    
    useEffect(() => {
        getSearchQuery(query).then((data) => setData(data));
    }, [query]);

    return (
        <div className={`max-w-240 w-full h-fit grid grid-cols-2 gap-4 mt-4 mb-4 ${ className }`}>
            {data.map((el, i) => {
                return (
                    <StockViewMedium key={i} name={el.name} ticker={el.ticker} exchange={el.primary_exchange}/>
                );
            })}
        </div>
    )
}