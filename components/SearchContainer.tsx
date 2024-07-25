import { ITickersResults } from "@polygon.io/client-js";
import { StockViewMinimal } from "./StockViewMinimal"

import '@/app/globals.css';

export interface SearchContainerProps {
    className?: string | undefined,
    results: ITickersResults[],
}

const Divider = () => {
    return <div className="w-80 h-0.5 bg-lighter mx-auto my-1.5"></div>;
}

export const SearchContainer = ({
    className,
    results,
}: SearchContainerProps) => {
    return (
        <div className={`
            bg-bg pb-2 w-fit rounded-lg shadow-md 
            ${ className }
        `}>
            <div className="
                max-h-56 overflow-y-scroll
                md:max-h-64    
            ">
                {results.map((el) => {
                    return (
                        <>
                            {/* <Divider /> */}
                            <StockViewMinimal name={el.name} ticker={el.ticker} exchange={el.primary_exchange}/>
                        </>
                    );
                })} 
            </div>
            
        </div>
    )
}