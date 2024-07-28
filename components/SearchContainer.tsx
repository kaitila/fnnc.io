import { ITickersResults } from "@polygon.io/client-js";
import { StockViewMinimal } from "./StockViewMinimal"

import '@/app/globals.css';

export interface SearchContainerProps {
    className?: string | undefined,
    results: ITickersResults[],
    maxHeight?: number;
    maxHeightMd?: string;
}

const Divider = () => {
    return <div className="w-4/5 h-0.25 bg-lighter mx-auto my-1.5"></div>;
}

export const SearchContainer = ({
    className,
    results,
    maxHeight,
    maxHeightMd = '64',
}: SearchContainerProps) => {
    return (
        <div className={`
            bg-bg py-2 rounded-lg shadow-md 
            ${ className }
        `}>
            <div className={`
                overflow-y-scroll
                `}
                style={{
                    maxHeight: `${maxHeight}rem`,
                }}
            >
                {results.map((el, i) => {
                    return (
                        <>
                            { i > 0 ? <Divider /> : null}
                            <StockViewMinimal name={el.name} key={i} ticker={el.ticker} exchange={el.primary_exchange}/>
                        </>
                    );
                })} 
            </div>
            
        </div>
    )
}